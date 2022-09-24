const nav = document.querySelector(
  "div#layoutSidenav_nav > nav#sidenavAccordion > div.sb-sidenav-menu > div.nav"
);

const newElement = (type) => document.createElement(type);
const addAttributes = (element, attributes) => {
  const attribute = attributes.split("=");
  element.setAttribute(attribute[0], attribute[1]);
  return element;
};
const addIcon = (class_icon) => {
  const i = newElement("I");
  i.className = class_icon;

  const div = newElement("DIV");
  div.className = "sb-nav-link-icon";
  div.appendChild(i);

  return div;
};

const functions = {
  heading: (link) => {
    const div = newElement("DIV");
    div.className = "sb-sidenav-menu-heading";
    div.textContent = link.text;
    div.setAttribute('data-type', "item");
    return div;
  },
  link: (link) => {
    let a = newElement("A");
    a.className = "nav-link";
    a.href = link.href;
    a.setAttribute('data-type', "item");

    if (link.icon) {
      const icon = addIcon(link.icon);
      a.appendChild(icon);

      const label = newElement("label");
      label.textContent = link.text;
      a.appendChild(label);
    } else {
      a.textContent = link.text;
    }

    if (![undefined, null, ""].includes(link.attributes)) {
      link.attributes.forEach((attribute) => (a = addAttributes(a, attribute)));
    }

    return a;
  },
  collapse: (link, rol, state_session) => {
    let a = newElement("A");
    a.setAttribute('data-type', "item");
    a.className = "nav-link collapsed";
    a.href = "#";
    link.attributes.forEach((attribute) => (a = addAttributes(a, attribute)));

    if (link.icon) {
      const icon = addIcon(link.icon);
      a.appendChild(icon);

      const label = newElement("label");
      label.textContent = link.text;
      a.appendChild(label);
    } else {
      a.textContent = link.text;
    }

    const div_i = newElement("DIV");
    div_i.className = "sb-sidenav-collapse-arrow";

    const i = newElement("I");
    i.className = "fas fa-angle-down";
    div_i.appendChild(i);
    a.appendChild(div_i);

    const div = newElement("DIV");
    div.className = "collapse";
    div.id = a.getAttribute("data-reference");

    if (link.parent) {
      div.setAttribute("data-bs-parent", link.parent);
    } else {
      div.setAttribute("data-bs-parent", "#sidenavAccordion");
    }

    div.setAttribute("aria-labelledby", a.getAttribute("data-reference"));

    const nav_elem = newElement("NAV");
    nav_elem.className = "sb-sidenav-menu-nested nav";
    nav_elem.id = `sidenavAccordion-${link.text
      .replace(/[ ]/gm, "-")
      .toLowerCase()
      .trim()}`;

    link.childs.forEach((child) => {
      child.parent = nav_elem.id;
      const linkFunction = functions[child.type];
      const cmp = linkFunction(child, rol, state_session);

      if (["online/offline", state_session].includes(child.state)) {
        if (![undefined, null, ""].includes(cmp.length)) {
          if (child.permissions.includes(rol)) {
            cmp.forEach((c) => nav_elem.appendChild(c));
          }
        } else {
          if (child.permissions.includes(rol)) {
            nav_elem.appendChild(cmp);
          }
        }
      }
    });

    div.appendChild(nav_elem);

    return [a, div];
  },
};

const links = [
  {
    text: "General",
    type: "heading",
    permissions: [0, 1, 2, 3],
    state: "online/offline",
  },
  {
    text: "Home",
    type: "link",
    href: "index.php",
    icon: "fa-solid fa-house",
    permissions: [0, 1, 2],
    state: "online/offline",
  },
  {
    text: "Dashboard",
    type: "link",
    href: "index.php",
    icon: "fa-solid fa-house",
    permissions: [1, 2],
    state: "online",
  },
  {
    text: "Tablas",
    type: "link",
    href: "tablas.php",
    icon: "fa-solid fa-house",
    permissions: [0],
    state: "offline",
  },
  {
    text: "Ingreso",
    type: "link",
    href: "login.php",
    icon: "fa-solid fa-house",
    permissions: [0],
    state: "offline",
  },
  {
    text: "Deliveries",
    type: "heading",
    permissions: [0, 1, 2, 3],
    state: "online/offline",
  },
  {
    text: "Pedidos",
    type: "collapse",
    href: "#",
    icon: "fa-solid fa-house",
    permissions: [1, 2],
    state: "online",
    attributes: [
      "data-reference=collapse-pedidos",
      "data-bs-toggle=collapse",
      "data-bs-target=#collapse-pedidos",
      "aria-expanded=false",
      "aria-controls=collapse-pedidos",
    ],
    childs: [
      {
        text: "Ejemplo 1",
        type: "link",
        icon: "fa-solid fa-house",
        href: "#",
        state: "online",
        permissions: [1],
      },
      {
        text: "Ejemplo 2",
        type: "link",
        href: "#",
        state: "online",
        permissions: [2],
      },
      {
        text: "Ejemplo 3",
        type: "link",
        href: "#",
        state: "online",
        permissions: [2],
      },
    ],
  },
  {
    text: "McDonalds",
    icon: "fa-solid fa-house",
    type: "collapse",
    permissions: [0, 1],
    state: "online/offline",
    attributes: [
      "data-reference=collapse-mc-donals",
      "data-bs-toggle=collapse",
      "data-bs-target=#collapse-mc-donals",
      "aria-expanded=false",
      "aria-controls=collapse-mc-donals",
    ],
    childs: [
      {
        text: "Ejemplo 1",
        type: "link",
        href: "#",
        state: "offline",
        permissions: [0, 1],
      },
      {
        text: "Ejemplo 2",
        type: "link",
        href: "#",
        state: "online",
        permissions: [2],
      },
      {
        text: "Luci SAS",
        icon: "fa-solid fa-house",
        type: "collapse",
        permissions: [1],
        state: "online",
        attributes: [
          "data-reference=luci",
          "data-bs-toggle=collapse",
          "data-bs-target=#luci",
          "aria-expanded=false",
          "aria-controls=luci",
        ],
        childs: [
          {
            text: "Ejemplo 1.1",
            type: "link",
            href: "#",
            state: "online",
            permissions: [1],
          },
          {
            text: "Ejemplo 2.1",
            type: "link",
            href: "#",
            state: "online",
            permissions: [2],
          },
        ],
      },
    ],
  },
  {
    text: "Extra",
    type: "heading",
    permissions: [0, 3],
    state: "online/offline",
  },
  {
    text: "Sleon",
    type: "link",
    href: "#",
    state: "online",
    permissions: [3],
  },
  {
    text: "Lion-Client",
    type: "link",
    href: "https://lion-client.vercel.app/",
    permissions: [0, 1],
    attributes: ["target=_blank"],
    state: "offline",
  },
];

function dynamicSidebar(state_session, rol = 0) {
  nav.querySelectorAll('div[data-type]').forEach(child => child.remove());
  nav.querySelectorAll('a[data-type]').forEach(child => child.remove());

  links.forEach((link, index) => {
    const linkFunction = functions[link.type];
    const cmp = linkFunction(link, rol, state_session);

    if (["online/offline", state_session].includes(link.state)) {
      if (![undefined, null, ""].includes(cmp.length)) {
        if (link.permissions.includes(rol)) {
          cmp.forEach((c) => nav.appendChild(c));
        }
      } else {
        if (link.permissions.includes(rol)) {
          nav.appendChild(cmp);
        }
      }
    }
  });
}