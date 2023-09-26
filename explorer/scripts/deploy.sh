for manifest in manifests/*.yaml; do
    sqd deploy . --manifest $manifest --update --no-stream-logs
done