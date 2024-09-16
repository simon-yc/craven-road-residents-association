# Variables
variable "env" {
  type        = string
  description = "Environment Prefix"
}

variable "project_id" {
  type        = string
  description = "Your Google Cloud project ID"
}

variable "domain_name" {
  type        = string
  description = "Your domain name"
}