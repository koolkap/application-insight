1. Go to Azure portal and search for the application insight in the folder

2. create the resource as the default option and deploy 

3. go to the application insight and copy Instrumentation Key in the overview

InstrumentationKey=9d56edda-13f7-4ba9-9461-0cf68d50032b;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/;ApplicationId=f876dbe7-9aa8-4074-84af-31c5984486cf

4. Install the mongodb from the community link

https://www.mongodb.com/try/download/community

5. Install and run the mongodb at 

mongodb://127.0.0.1:27017

6. add connection string in the env variable

DB_URL=mongodb://127.0.0.1:27017/productsdb

alterantivley you can also use free monogodb service to deploy the free mongoDB 

7. Now make the docker file and containerized your application using 

docker build -t appinsights-demo .

8. run locally docker to see everything is good

9. Now create Azure ACR  <we have node js application so we connect github>

[skip 10 -11 for nodejs]

10. build the local image push to the acr via dockerized.ps1 shell script

11. map the container image in the web app azure

12. now run the application on the deployed resource /product GET and /product POST

https://mywebapp12-hpcma9gkc0cjeaft.eastus2-01.azurewebsites.net/products

13. Now enable the application insight now 

go to web app >> Settings >> application insight


