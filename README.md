Приложение запускается в несколько этапов.
На первом этапе по команде `npm run init` устанавливаются необходимые зависимости и генерируется база данных.
На втором этапе команда `npm run build` транспилирует написанный на typescript код в javascript.
Далее, при необходимости добавить в базу данных начальные значения, нужно выполнить команду `npm run seed`.
Команда `npm run start` запускает приложение.

Кроме того, для корректной работы приложения необходимо задать значения для следующих переменных окружения:
DATABASE_URL - url подключения к базе данных
TOKEN - токен бота в Telegram

DATABASE_URL="postgresql://{{login}}:{{password}}@localhost:5432/flower_shop?schema=public"
TOKEN={{TELEGRAM_TOKEN}}