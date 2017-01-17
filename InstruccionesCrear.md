## Instrucciones : Crear Bower

1. Crear una carpeta

2. Dentro de la carpeta iniciar repositorio git y añadir repositorio remoto de github.

3. Iniciar bower

   $ bower init

       ? name bootstrap-redmine
       ? description Dashboard Bootstrap Redmine style, including Mootools Plugins
       ? main file
       ? keywords redmine,mootools,jquery
       ? authors Pepe Valdivia <jvaldivia@softweb.pe>
       ? license MIT
       ? homepage https://github.com/pepeul1191/dashboard-redmine
       ? set currently installed components as dependencies? No
       ? add commonly ignored files to ignore list? Yes
       ? would you like to mark this package as private which prevents it from being ac? would you like to mark this package as private which prevents it from being accidentally published to the registry? No

       {
         name: 'Dashboard Bootstrap Redmine Style',
         homepage: 'https://github.com/pepeul1191/dashboard-redmine',
         authors: [
           'Pepe Valdivia <jvaldivia@softweb.pe>'
         ],
         description: 'Dashboard Bootstrap Redmine style, including Mootools Plugins',
         main: '',
         keywords: [
           'redmine',
           'mootools',
           'jquery'
         ],
         license: 'MIT',
         ignore: [
           '**/.*',
           'node_modules',
           'bower_components',
           'test',
           'tests'
         ]
       }

       ? Looks good? Yes

4. Instalar Dependencias

  $ bower install <package> --save

5 . En el directorio local del repositorio, registrar el repositorio de github en bower.io

  $ bower register swp-plugins https://github.com/pepeul1191/swp-plugins.git


---

Fuentes:

+ https://bower.io/docs/creating-packages/
