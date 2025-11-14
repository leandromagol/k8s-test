minikube start \
  --driver=docker \
  --cpus=4 \
  --memory=6144 \
  --insecure-registry="localhost:5000" \
  --kubernetes-version=v1.28.0

# Habilitar Ingress
minikube addons enable ingress

# Habilitar metrics-server (útil para monitoramento)
minikube addons enable metrics-server

# Verificar tudo
echo "✅ Verificando instalação..."
minikube status
kubectl get nodes
kubectl get pods -A
