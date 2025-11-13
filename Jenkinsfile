pipeline {
    agent any
    
    environment {
        BRANCH_SAFE = "${env.BRANCH_NAME.toLowerCase().replaceAll('/', '-').replaceAll('_', '-')}"
        NAMESPACE = "preview-${BRANCH_SAFE}"
        IMAGE_NAME = "preview-app"
        IMAGE_TAG = "${BRANCH_SAFE}-${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'ls -la'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        eval \$(minikube -p minikube docker-env)
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                        docker images | grep ${IMAGE_NAME}
                    """
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        # Criar namespace
                        kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                        
                        # Preparar e aplicar deployment
                        sed 's|DOCKER_IMAGE_PLACEHOLDER|${IMAGE_NAME}:${IMAGE_TAG}|g' k8s/deployment.yaml | \
                        sed 's|BRANCH_NAME_PLACEHOLDER|${BRANCH_SAFE}|g' | \
                        kubectl apply -n ${NAMESPACE} -f -
                        
                        # Aplicar service
                        kubectl apply -n ${NAMESPACE} -f k8s/service.yaml
                        
                        # Aplicar ingress
                        sed 's|BRANCH_NAME_PLACEHOLDER|${BRANCH_SAFE}|g' k8s/ingress.yaml | \
                        kubectl apply -n ${NAMESPACE} -f -
                        
                        # Aguardar deployment
                        kubectl rollout status deployment/app-deployment -n ${NAMESPACE} --timeout=180s
                        
                        # Mostrar status
                        echo "=== Pods ==="
                        kubectl get pods -n ${NAMESPACE}
                        echo "=== Services ==="
                        kubectl get svc -n ${NAMESPACE}
                        echo "=== Ingress ==="
                        kubectl get ingress -n ${NAMESPACE}
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo "✅ Deployment realizado com sucesso!"
            echo "🌐 Acesse: http://${BRANCH_SAFE}.local"
            echo "📝 Namespace: ${NAMESPACE}"
            echo ""
            echo "Para acessar, adicione ao /etc/hosts:"
            echo "\$(minikube ip) ${BRANCH_SAFE}.local"
        }
        failure {
            echo "❌ Deployment falhou"
            sh """
                echo "=== Logs dos Pods ==="
                kubectl logs -n ${NAMESPACE} -l app=preview-app --tail=50 || true
            """
        }
    }
}
