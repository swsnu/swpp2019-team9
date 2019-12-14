import os
f = open("group.json", 'w')

f.write("[\n")

for i in range(1,20):
    data1='''{
    "model": "group.group",
    "pk": %d,
    "fields": {
        "reg_date": "2019-11-27T15:47:04.129",
        "group_name": "%d",
        "group_members": [
'''%(i,i)
    data2=""
    for j in range(1,101):
        data2+='            %d,\n'%(j)
    data2=data2[:-2]
    data3='''
       ]
    }
},
'''
    data=data1+data2+data3
    f.write(data)
f.seek(f.tell() - 3, os.SEEK_SET)
f.write('')
f.write("\n]")
f.close()
