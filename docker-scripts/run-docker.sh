#!/bin/bash
docker run -d --name openwb2 -v /Volumes/wbcolortheme2:/home/pi/wbcolortheme2 -p 7080:80 -p 1883:1883 -p 9001:9001 -p 8080:8080 -it openwb2 > dockeroutput
docker exec -ti openwb2 sh -c "cd /home/pi/wbcolortheme2; npm install"
docker exec -ti openwb2 sh -c "cd /home/pi/wbcolortheme2; npm run serve" 