
if [[ $(redis-server) ]]
then
    echo installed redis-server
else
    echo installing redis-server
    wget http://download.redis.io/redis-stable.tar.gz
    tar xvzf redis-stable.tar.gz
    cd redis-stable
    make
    sudo cp src/redis-server /usr/local/bin/
    sudo cp src/redis-cli /usr/local/bin/
    sudo make install
    cd ..
    rm -rf redis-stable
fi

redis-server
