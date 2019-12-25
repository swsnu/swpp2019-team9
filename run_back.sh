mysql.server start
source fevertime_backend/envfever/bin/activate
python fevertime_backend/manage.py runserver
deactivate
mysql.server stop