variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "hello-world-nextjs"
}

variable "github_repository" {
  description = "GitHub repository in the format 'owner/repo'"
  type        = string
  # Example: "your-username/hello-world-nextjs"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}