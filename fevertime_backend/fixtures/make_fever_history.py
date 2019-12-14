import os
f = open("fever_history.json", 'w')

f.write("[\n")

for i in range(1, 32):
    category="Study"
    data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": 1,\n\
        \"category\": \"%s\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(i,category,i,i)
    f.write(data)

for i in range(1, 32):
    category="Work"
    data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": 1,\n\
        \"category\": \"%s\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(i+31,category,i,i)
    f.write(data)

for i in range(1, 32):
    category="Read"
    data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": 1,\n\
        \"category\": \"%s\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(i+62,category,i,i)
    f.write(data)

for i in range(1, 31):
    category="Etc."
    data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": 1,\n\
        \"category\": \"%s\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(i+93,category,i,i)
    f.write(data)

i=31
category="Etc."

data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": 1,\n\
        \"category\": \"%s\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(i+93,category,i,i)
f.write(data)
for i in range(1,1000):
    day=i%7+1
    person=i%100+2
    pk=i+124
    data = "{\n\
    \"model\": \"fever.fever_history\",\n\
    \"pk\": %d,\n\
    \"fields\": {\n\
        \"user\": %d,\n\
        \"category\": \"Study\",\n\
        \"etcCategory\": \"All\",\n\
        \"goalTime\": \"01:00\",\n\
        \"start_time\": \"2019-12-%02dT02:31:04.729\",\n\
        \"end_time\": \"2019-12-%02dT02:32:08.485\",\n\
        \"total_time\": \"00:02:00\",\n\
        \"fever_time\": \"00:01:00\",\n\
        \"fever_rate\": 0.5,\n\
        \"fever_count\": 1,\n\
        \"click_end\": \"Y\"\n\
    }\n\
},\n"%(pk,person,day,day)
    f.write(data)
f.seek(f.tell() - 3, os.SEEK_SET)
f.write('')
f.write("\n]")
f.close()
