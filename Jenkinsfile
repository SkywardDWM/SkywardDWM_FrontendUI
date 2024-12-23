pipeline {
    agent any

    environment {
        NODE_VERSION = '16.x' // Replace with your required Node.js version
        DEPLOY_PATH = 'C:\\inetpub\\wwwroot\\DWM_Frontend' // Deployment directory for the frontend.make sure you rename it for new project 
    }

    stages {
        stage('Verify Node.js Installation') {
            steps {
                echo 'Checking Node.js and npm versions...'
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install --force'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building application...'
                bat 'npm run build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application...'
                bat """
                IF NOT EXIST \"${DEPLOY_PATH}\" (
                    mkdir \"${DEPLOY_PATH}\"
                )
                xcopy /s /e /y dist\\* \"${DEPLOY_PATH}\"
                """
                echo 'Application deployed successfully.'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
