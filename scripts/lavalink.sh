if [[ ! $(which java13) ]]
then
  echo "Warning: java13 not found"
  echo "if you want to install, following details below:"
  echo "- Download openjdk v13 from"
  echo "  https://download.java.net/java/GA/jdk13.0.2/d4173c853231432d94f001e99d882ca7/8/GPL/openjdk-13.0.2_linux-x64_bin.tar.gz"
  echo "  and unzip it"
  echo "- Create symbolic link"
  echo "  sudo ln --symbolic /path/to/downloaded/jdk-13.0.2/bin/java /usr/bin/java13"
  echo "- Restart"
else
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
    echo starting lavalink
    java13 --illegal-access=deny -jar $(pwd)/lavalink/lavalink.jar &> /dev/null
    true
  fi
fi
