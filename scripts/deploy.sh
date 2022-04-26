if [ -z "$VERSION" ]
then
  echo "Please specify version(\$VERSION)."
  exit
fi

if [ -z "$PROJECT_ID" ]
then
  echo "Please specify google cloud project id( \$VERSION )."
  exit
fi

gcloud builds submit --project ${PROJECT_ID} --tag gcr.io/${PROJECT_ID}/prodeo-backend:${VERSION} .
gcloud app deploy --project ${PROJECT_ID} --image-url gcr.io/${PROJECT_ID}/prodeo-backend:${VERSION}