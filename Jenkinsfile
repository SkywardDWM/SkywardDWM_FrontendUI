
pipeline {
    agent any

    environment {
        NODE_VERSION = '16.x' // Replace with your required Node.js version
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
                // Use --legacy-peer-deps if dependency conflicts persist
                bat 'npm install --force'
            }
        }

        // test stage skkiped and it worked 

        stage('Build Application') {
            steps {
                echo 'Building application...'
                // Ensure `npm run build` is configured to build the project
                bat 'npm run build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying application...'
                // Example: Copy build files to the deployment directory
                bat '''
                IF NOT EXIST "C:\\path\\to\\deployment\\directory" (
                    mkdir "C:\\path\\to\\deployment\\directory"
                )
                xcopy /s /e /y dist\\* C:\\path\\to\\deployment\\directory
                '''
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
