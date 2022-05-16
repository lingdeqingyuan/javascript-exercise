const data = [
  {
    id: 1,
    name: "目录1",
    parentId: 0,
  },
  {
    id: 2,
    name: "目录1-1",
    parentId: 1,
  },
  {
    id: 3,
    name: "目录1-2",
    parentId: 1,
  },
  {
    id: 4,
    name: "目录1-1-1",
    parentId: 2,
  },
  {
    id: 5,
    name: "目录1-1-1-1",
    parentId: 4,
  },
];

const dataToTree = (data) => {
  const map = {};
  const res = [];

  data.forEach((element) => {
    map[element.id] = element;
  });

  data.forEach((element) => {
    if (map[element.parentId]) {
      map[element.parentId].children = map[element.parentId].children || [];
      map[element.parentId].children.push(element);
    } else {
      res.push(element);
    }
  });

  return res;
};

const treeToDom = (root, data) => {
  data.forEach((item) => {
    const detailsEle = document.createElement("details");
    const summaryEle = document.createElement("summary");
    const menuName = document.createElement("span");
    menuName.innerText = item.name;
    summaryEle.appendChild(menuName);
    detailsEle.appendChild(summaryEle);
    root.appendChild(detailsEle);
    if (item.children?.length) {
      treeToDom(detailsEle, item.children);
    }
  });
};

const root = document.getElementById("root");
treeToDom(root, dataToTree(data));
