if [[ ! $(which mariadb) ]]
then
  echo "Error: Mariadb not found"
  echo "[[stop]]"
else
  if [[ ! $(systemctl | grep mariadb | grep running) ]]
  then
    echo "Error: Mariadb not started"
    echo "[[stop]]"
  fi
fi
