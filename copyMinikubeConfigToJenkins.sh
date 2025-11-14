# Copiar toda a pasta .minikube para o container Jenkins
docker cp ~/.minikube jenkins:/root/.minikube

# Copiar o kubeconfig
docker cp ~/.kube/config jenkins:/root/.kube/config

# Ajustar permissões
docker exec -u root jenkins chown -R jenkins:jenkins /root/.minikube
docker exec -u root jenkins chown -R jenkins:jenkins /root/.kube
docker exec -u root jenkins chmod 600 /root/.kube/config
