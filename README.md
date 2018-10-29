specs:


1) login.spec.js - info, window, url, remind pass, xhr auth? changed url to /#, ścieżki negatywne
2) navigation.spec.js - (before - logged) menu, click każdy i sprawdź czy właściwa strona
3) page.create.spec.js - (before - login) type/select, toast - pozytywny i negatywny, page Check create: (POST)
4) page.edit.spec.js - (before login i create - API) - url (/#/builder/6aae5670-db5a-11e8-aae5-3f60636fa4cb/locale/url), buttony, metatagi) up/down, add, delete, edit?
5) footer.edit.spec.js - (before - create page API (przekazać komponenty?), go to edit) - click edit -> edit data -  sprawdzić na tej samej stronie?
6) footer.live.spec.js ->
7) footer.default.spec.js


--integration
----components
------footer
--------footer.edit.spec.js
--------footer.edit.spec.js
--------footer.edit.spec.js
----authentication
------login
------user.create
------user.change
------user.delete
------user.list
----bulkPublishes (list + bulk, safe bulk, sync, autosync?)
----redirect
----assets (dodawanie z api?)
----videos (dodawanie z api?)
----defaults i component templates
----raports


file for uploads from: http://techslides.com/sample-webm-ogg-and-mp4-video-files-for-html5 
free to use

TODO:
- eslint - reverse of rules? add only necessary ones instead of disabling rules from airbnb or disabling lines
- to Commands - page create, page enable publish
- publish test for PROD - every hour? on some standard page?
- why I need to log in by UI to have a page - why token is not enough? - no permissions in localStorage!!! refactor to only log in once by UI and then only by token setting, standard before/beforeEach?
- folder/file - authentication - to test permissions - seeing tabs ( helper - all admin/itd), page create, page seeing, page duplicate, revoke itd? - just change localStorage and visit :D