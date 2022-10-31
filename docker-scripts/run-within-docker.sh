service apache2 start
mosquitto -c /var/www/html/openWB/data/config/mosquitto_local.conf -v &
sleep 1
mosquitto -c /var/www/html/openWB/data/config/openwb_local.conf -v &
sleep 1
mosquitto -c /etc/mosquitto/conf.d/openwb.conf -v &
mosquitto_pub -p 1886 -t openWB/system/update_in_progress -r -m 'false'
mosquitto_pub -p 1883 -t openWB/system/update_in_progress -r -m 'false'
mosquitto_pub -p 1886 -t openWB/system/boot_done -r -m 'true'
mosquitto_pub -p 1883 -t openWB/system/boot_done -r -m 'true'
mosquitto_pub -t openWB/system/reloadDisplay -m "1"
touch /var/www/html/openWB/ramdisk/bootdone
sudo -u openwb /var/www/html/openWB/packages/main.py