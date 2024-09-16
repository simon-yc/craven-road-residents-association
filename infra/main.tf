

module "craven_road_residents_association_hosting_prd" {
  source      = "./modules/hosting"
  project_id = var.project_id
  domain_name = "pont2post.org"
  env = "prd"
}

module "craven_road_residents_association_hostin_dev" {
  source      = "./modules/hosting"
  project_id = var.project_id
  domain_name = "dev.pont2post.org"
  env = "dev"
}