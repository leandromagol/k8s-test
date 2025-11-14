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
            }
        }
        
        stage('Build Docker Image in Minikube') {
            steps {
                script {
                    sh '''
                        # Copiar arquivos para o Minikube
                        eval $(minikube docker-env)
                        
                        # Build da imagem no Docker do Minikube
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                        
                        # Verificar se a imagem foi criada
                        docker images | grep ${IMAGE_NAME}
                    '''
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        # Criar namespace
                        kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -
                        
                        # Preparar manifests
                        sed 's|DOCKER_IMAGE_PLACEHOLDER|${IMAGE_NAME}:${IMAGE_TAG}|g' k8s/deployment.yaml | \
                        sed 's|BRANCH_NAME_PLACEHOLDER|${BRANCH_SAFE}|g' | \
                        kubectl apply -n ${NAMESPACE} -f -
                        
                        kubectl apply -n ${NAMESPACE} -f k8s/service.yaml
                        
                        sed 's|BRANCH_NAME_PLACEHOLDER|${BRANCH_SAFE}|g' k8s/ingress.yaml | \
                        kubectl apply -n ${NAMESPACE} -f -
                        
                        # Aguardar deployment
                        kubectl rollout status deployment/app-deployment -n ${NAMESPACE} --timeout=180s
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo "✅ Deployment successful!"
            echo "🌐 Access: http://${BRANCH_SAFE}.local"
            echo "📝 Namespace: ${NAMESPACE}"
        }
        failure {
            echo "❌ Deployment failed"
            sh """
                echo "Debug info:"
                kubectl get pods -n ${NAMESPACE}
                kubectl describe pod -n ${NAMESPACE} -l app=preview-app
                kubectl logs -n ${NAMESPACE} -l app=preview-app || true
            """
        }
    }
}
