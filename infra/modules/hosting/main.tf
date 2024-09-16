
resource "random_integer" "suffix" {
  min = 1
  max = 500
  keepers = {
    # Generate a new integer each time we switch to a new listener ARN
    listener_arn = var.project_id
  }
}

# Create a Google Cloud Storage bucket
resource "google_storage_bucket" "static_website_bucket" {
  project = var.project_id
  name          = "${var.env}-crr-bucket-${random_integer.suffix.result}"
  location      = "US" # Choose your preferred location
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# Make the bucket publicly accessible
resource "google_storage_bucket_iam_binding" "public_rule" {
  bucket  = google_storage_bucket.static_website_bucket.name
  role    = "roles/storage.objectViewer"
  members = ["allUsers"]
}

# # Create an HTTP(S) Load Balancer
resource "google_compute_url_map" "urlmap" {
  project = var.project_id
  name            = "${var.env}-urlmap-${random_integer.suffix.result}"
  description     = "${var.env} URL Map"
  default_service = google_compute_backend_bucket.default.id
  host_rule {
    hosts        = ["${var.domain_name}"]
    path_matcher = "allpaths"
  }
  path_matcher {
    name            = "allpaths"
    default_service = google_compute_backend_bucket.default.id
  }
}

resource "google_compute_target_http_proxy" "default" {
  project = var.project_id
  name    = "${var.env}-target-http-proxy-${random_integer.suffix.result}"
  url_map = google_compute_url_map.urlmap.id
}

resource "google_compute_target_https_proxy" "default" {
  project = var.project_id
  name             = "${var.env}-target-https-proxy-${random_integer.suffix.result}"
  url_map          = google_compute_url_map.urlmap.id
  ssl_certificates = [google_compute_managed_ssl_certificate.default.id]
}

resource "google_compute_backend_bucket" "default" {
  project = var.project_id
  name        = "${var.env}-bucket-${random_integer.suffix.result}"
  bucket_name = google_storage_bucket.static_website_bucket.name
  enable_cdn  = true
}

resource "google_compute_global_forwarding_rule" "http_forwarding_rule" {
  project = var.project_id
  name                  = "${var.env}-http-forwarding-rule-${random_integer.suffix.result}"
  ip_address            = google_compute_global_address.ip_address.address
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "80"
  target                = google_compute_target_http_proxy.default.id
}

resource "google_compute_global_forwarding_rule" "https_forwarding_rule" {
  project = var.project_id
  name                  = "${var.env}-https-forwarding-rule-${random_integer.suffix.result}"
   ip_address            = google_compute_global_address.ip_address.address
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "443"
  target                = google_compute_target_https_proxy.default.id
}

# Create a managed SSL certificate
resource "google_compute_managed_ssl_certificate" "default" {
  project = var.project_id
  name = "${var.env}-managed-ssl-cert-${random_integer.suffix.result}"
  managed {
    domains = ["${var.domain_name}"]
  }
}

resource "google_compute_global_address" "ip_address" {
  project = var.project_id
  name         = "${var.env}-lb-ip-address"
  address_type = "EXTERNAL" 
}