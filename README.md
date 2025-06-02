# 🏋️‍♂️ RindeMás

**RindeMás** es una aplicación web personal para gestionar rutinas de entrenamiento y usuarios asociados. Pensada como herramienta de uso diario para ti y tu entorno (familiares, amigos), permite añadir perfiles personalizados y organizar sesiones de ejercicio según el día o grupo muscular.

## 🚀 Estado del proyecto

### 1. **Página de inicio ✅**

- ✅ Estructura HTML finalizada
- ✅ Estilos CSS aplicados (colores, tipografía, grid, botones, etc.)
- ✅ Formulario de creación de usuarios finalizado
- ✅ Edición de usuario con validación visual
- ✅ Prevención de usuarios duplicados
- ✅ Almacenamiento local con `localStorage`
- ✅ Selección múltiple y eliminación masiva
- ✅ Eliminación con cuenta regresiva
- ✅ Transiciones y alertas visuales estilizadas
+ 🛠️ En desarrollo: Responsive design

---

### 2. **Página de usuario (En desarrollo 🛠️)**

+ 🛠️ En desarrollo: Estructura HTML inicial
+ 🛠️ En desarrollo: Imagen de fondo
+ 🛠️ En desarrollo: Estilos base en CSS
+ 🛠️ En desarrollo: Responsive design

---

## ✨ Funcionalidades

- Página de bienvenida con título y selección de perfil
- Tarjetas visuales para cada usuario
- Botón para añadir nuevos usuarios
- Formulario con HTML y CSS siguiendo metodología BEM
- Preparado para integración futura con LocalStorage y backend
- Añadir y editar perfiles de usuario
- Eliminar usuarios de forma individual
- Mostrar botón "Añadir usuario" solo si hay menos de 6
- Sincronización con localStorage (persistencia de usuarios)
- Interfaz amigable y adaptable
- Eliminación múltiple por selección
- Cuenta regresiva al eliminar usuario(s)

---

## 📂 Estructura del proyecto

```plaintext

RindeMas/
├── .vscode/
│   └── settings.json
├── assets/
│   ├── images/
│   │   └── Fondo-Usuario.png
│   ├── logo/
│   │   ├── favicon-16x16.png
│   │   └── logo.png
│   └── wireframe/
│       ├── RindeMás-Ejercicios.png
│       ├── RindeMás-Inicio.png
│       ├── RindeMás-Rutina.png
│       └── RindeMás-Usuario.png
├── css/
│   ├── style.css
│   ├── base/
│   │   ├── layout.css
│   │   ├── typography.css
│   │   └── variables.css
│   ├── components/
│   │   ├── card.css
│   │   ├── checkbox.css
│   │   ├── countdown.css
│   │   ├── dialog.css
│   │   ├── dropdown.css
│   │   ├── footer.css
│   │   ├── form.css
│   │   ├── header.css
│   │   ├── message.css
│   │   └── utility.css
│   └── pages/
│       └── home.css
├── data/
│   └── exercises.json
├── js/
│   ├── pages/
│   │   └── home/
│   │       ├── eventHandlers.js
│   │       ├── formHandler.js
│   │       ├── main.js
│   │       └── userRenderer.js
│   └── shared/
│       ├── components/
│       │   ├── confirmation.js
│       │   └── ui.js
│       ├── config/
│       │   └── constants.js
│       └── utils/
│           ├── helpers.js
│           └── storage.js
├── pages/
│   └── user.html
├── index.html
├── .gitignore
├── LICENSE
└── README.md

```

---

## 🧩 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (implementado en la página de inicio)
- localStorage para persistencia de usuarios
- Google Fonts (Titillium Web, Rajdhani)
- Metodología BEM (Bloques, Elementos, Modificadores)

---

## 🛠️ Cómo ejecutar el proyecto

Puedes abrir el proyecto localmente así:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/rindemas.git
   ```
2. Abre `index.html` en tu navegador.

> También puedes desplegarlo fácilmente en GitHub Pages o Netlify.

---

## 🤝 Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una rama nueva con tu mejora:
   ```bash
   git checkout -b mejora/tu-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Haz push a la rama:
   ```bash
   git push origin mejora/tu-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

---

## 🌐 Demo en vivo

Puedes ver la página de inicio funcionando aquí:
[https://alejandrorumi-dev.github.io/RindeMas/](https://alejandrorumi-dev.github.io/RindeMas/)

## 👨‍💻 Autor

Desarrollado por **Alejandro Rumí Morales** como proyecto personal de aprendizaje y mejora en desarrollo frontend.  
Forma parte de su portafolio técnico y de prácticas con HTML, CSS y JavaScript.