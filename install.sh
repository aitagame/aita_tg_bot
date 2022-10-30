rm -rf /srv/aita-tg-bot;

unzip -o build_aita_tg_bot.zip -d /srv/aita-tg-bot;
rm -rf build_aita_tg_bot.zip;
rm -rf install_aita_tg_bot.sh;

pm2 reload aita-tg-bot --update-env;
