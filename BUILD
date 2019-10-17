package(default_visibility = ["//visibility/public"])

load("@io_bazel_rules_docker//container:container.bzl", "container_image")

container_image(
    name = "meal-planner",
    base = "//experimental/nodejs:nodejs",
    cmd = ["./lib/index.js"],
    files = [":./lib/index.js"],
)

load("@io_bazel_rules_docker//contrib:test.bzl", "container_test")

container_test(
    name = "meal-planner_test",
    configs = ["testdata/meal-planner.yaml"],
    image = ":meal-planner",
)