FROM debian:bullseye

# RUN apt update && \
#    apt install -y sudo curl iproute2 vim bc apache2 php php-gd php-curl php-xml php-json libapache2-mod-php jq git mosquitto mosquitto-clients socat python3-pip sshpass
RUN apt update && \
    apt install -y sudo curl apt-utils systemctl
# openwb
RUN curl -s https://raw.githubusercontent.com/openWB/core/master/openwb-install.sh | sudo bash && \
    sudo chown openwb:openwb /var/www/html/openWB/ramdisk && \
    sudo sed -i 's/^listener .*/listener 1886 127.0.0.1/' /etc/mosquitto/conf_local.d/openwb_local.conf && \
    sudo sed -i 's/^address .*/address 127.0.0.1:1883/' /etc/mosquitto/conf_local.d/openwb_local.conf && \
    sudo sed -i 's/localhost/127.0.0.1/' /etc/apache2/sites-available/apache-openwb-ssl.conf 
    # useradd -m openwb && \
    # useradd -m pi && \
    # mkdir /var/www/html/openWB /run/mosquitto && \
    # chown openwb:openwb /var/www/html/openWB && \
    # chown mosquitto:mosquitto /run/mosquitto && \
    # sudo a2enmod proxy_http && \
    # sudo -u openwb git clone https://github.com/openWB/core.git --branch master /var/www/html/openWB && \
    # sudo -u openwb pip install -r /var/www/html/openWB/requirements.txt && \
    # chmod +x /var/www/html/openWB/runs/* /var/www/html/openWB/*.sh && \
    # touch /var/log/openWB.log && \
    # chmod 777 /var/log/openWB.log && \
    # cp /var/www/html/openWB/data/config/000-default.conf /etc/apache2/sites-available/ && \
    # sed -i '/^include_dir/d' /var/www/html/openWB/data/config/mosquitto_local.conf && \
    # sed -i 's/^listener .*/listener 1886 127.0.0.1/' /var/www/html/openWB/data/config/openwb_local.conf && \
    # sed -i 's/localhost/127.0.0.1/' /var/www/html/openWB/data/config/apache-openwb-ssl.conf && \
    # cat /var/www/html/openWB/data/config/openwb.conf >> /var/www/html/openWB/data/config/mosquitto_local.conf && \
    # sudo -u openwb mkdir /var/www/html/openWB/ramdisk && \
    # sed -i '12d;96,106d;107i\    return []' /var/www/html/openWB/packages/modules/loadvars.py && \
    # sed -i '6d;81,90d;91i\        return []' /var/www/html/openWB/packages/modules/loadvars.py && \
    # cp /var/www/html/openWB/index.html /var/www/html/index.html

# wbcolortheme2
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -  && \
    apt-get install -y nodejs && \
    cd /home/openwb && \
    git clone https://github.com/cshagen/wbcolortheme2.git && \
    cd /home/openwb/wbcolortheme2 && \
    npm install 

# node red
#RUN apt-get install nodered && \
#    systemctl enable nodered.service


COPY run-within-docker.sh /var/www/html/openWB/

CMD ["/bin/bash", "/var/www/html/openWB/run-within-docker.sh"]

# Http
EXPOSE 80
# MQTT
EXPOSE 1883
# MQTT Websocket
EXPOSE 9001
# Colors Theme
EXPOSE 8080

