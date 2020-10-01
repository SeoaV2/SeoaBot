echo fetching lavalink version...
version=$(cat $(pwd)/lavalink/version)

if [[ $(ls $(pwd)/lavalink/lavalink.jar) ]]
then
  echo installed lavalink v$version
else
  echo installing lavalink v$version
  wget https://github.com/Frederikam/Lavalink/releases/download/$version/Lavalink.jar -O $(pwd)/lavalink/lavalink.jar &2> /dev/null
fi

if [[ $(ps -a | grep java13) ]]
then
  echo lavalink aleady started
else
  echo start lavalink
  java13 -jar $(pwd)/lavalink/lavalink.jar
fi
