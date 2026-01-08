$acrname = "mycontainerreg12"

az acr login --name $acrname

az acr update -n $acrName --admin-enabled true
#Docker build -t flaskapp:latest .
#docker tag flask-python-app flaskcontainerreg123.azurecr.io/flask-python-app:v1

#docker push flaskcontainerreg123.azurecr.io/flask-python-app:v1

#second image

docker tag appinsights-demo mycontainerreg12.azurecr.io/appinsights-demo:latest

docker push mycontainerreg12.azurecr.io/appinsights-demo:latest