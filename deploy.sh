echo "Deploying ..."
sudo docker-compose stop
sudo docker-compose up --build -d
sudo docker system prune -a -f
