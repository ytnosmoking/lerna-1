#!/bin/sh

echo "脚本运行";
echo "$0";



    # 循环packages 读取 文件夹目录 运行服务
    for entry in `ls packages`; 
    do 
        # wait;
        yarn workspace $entry run serve;
        echo $entry
        # if [[ $entry != "main" && $entry == $1 ]];
        # then

        #     wait yarn workspace main run serve;
        #     wait yarn workspace $entry run serve;
        # elif [ $1 == "main" ];
        # then 
        #     wait yarn workspace $entry run serve;
        # fi
    done;

echo "done"
# for entry in `ls packages`;
# do 
#     echo $entry
# done;

# yarn workspace $1 run serve
