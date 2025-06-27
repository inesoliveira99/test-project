output "cloud_run_url" {
  description = "URL of the Cloud Run service"
  value       = google_cloud_run_v2_service.hello_world_service.uri
}

output "artifact_registry_repository" {
  description = "Artifact Registry repository URL"
  value       = google_artifact_registry_repository.hello_world_repo.name
}

output "docker_image_url" {
  description = "Full Docker image URL for CI/CD"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.hello_world_repo.repository_id}/${var.app_name}"
}

output "workload_identity_provider" {
  description = "Workload Identity Provider for GitHub Actions"
  value       = local.workload_identity_provider
}

output "service_account_email" {
  description = "GitHub Actions Service Account Email"
  value       = google_service_account.github_actions_sa.email
}

output "github_actions_setup_info" {
  description = "Information needed for GitHub Actions setup"
  value = {
    workload_identity_provider = local.workload_identity_provider
    service_account_email     = google_service_account.github_actions_sa.email
    project_id               = var.project_id
    region                   = var.region
    repository_url           = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.hello_world_repo.repository_id}"
    service_name             = google_cloud_run_v2_service.hello_world_service.name
  }
}