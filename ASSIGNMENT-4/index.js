var home = document.querySelector(".main-container");
let todoItem = [];

var addTask = (event) => {
  let id = event.target.className.split(" ");
  id = id[id.length - 1];
  document.querySelector(".subTask-popupadd").classList.add(id);
  popup($(".subTask-popup"));
};

var popup = (node, id = "") => {
  home.classList.add("blur");
  node.css({ display: "flex" });
};

var close = (node, id = 0) => {
  node.css({ display: "none" });
  home.classList.remove("blur");
  document.querySelector(".subTask-popupadd").classList.remove(id);
};

var deleteTask = (event) => {
  let id = event.target.className.split(" ");
  id = id[id.length - 1];
  var element = $("#" + id);
  element.remove();
  todoItem.forEach((element, index) => {
    if (element.category === id) {
      todoItem.splice(index, 1);
    }
  });
};



//to create--->Add list popup

        document.querySelector(".btn").addEventListener("click", () => {
        popup($(".category-popup"));
        });

//To Add-->card
    $(".category-popupadd").click((event) => {
    let category = document.querySelector(".category-popuptextbox").value;
    todoItem.push({ category: category, subTask: [] });
    var content = document.querySelector(".content");
    var card = document.createElement("div");
    card.className = "card " + category;
    card.id = category;

    card.innerHTML = `
        <div class="card-heading"> ${category}<hr/></div>
        <div class="content-head2 content-head1-${category}">
        <ol class="list-${category}"></ol>
        </div>
        <div class="content-head2">
        <div class="delete fa fa-trash ${category}" onClick=deleteTask(event)>
            </div>
        <div class="icon-add fa fa-plus-circle ${category}" onClick=addTask(event)>
            </div>
        </div>`;

    content.append(card);


    close($(".category-popup"), category);
    });

//To close--->popup 
$(".category-popupclose").on("click", () => {
  close($(".category-popup"));
}
)


//To add popup for subtask
$(".subTask-popupadd").on("click", () => {
  let categoryArr = event.target.className.split(" ");
  let getCategory = categoryArr[categoryArr.length - 1];
  let index = 0;
  for (let i = 0; i < todoItem.length; i++) {
    if (todoItem[i].category == getCategory) {
      index = i;
      break;
    }
  }

    todoItem[index].subTask.push($(".subTask-popuptextbox").val());
    let entry = document.createElement("li");
    entry.innerText = `${$(".subTask-popuptextbox").val()}`;
    entry.id = $(".subTask-popuptextbox").val();

    let completedButton = document.createElement("button");
    completedButton.className = "mark completed-" + getCategory;
    completedButton.setAttribute("onclick", "completed(event)");
    completedButton.innerText = "Mark Done";
    entry.append(completedButton);
    document.querySelector(".list-" + getCategory).append(entry);

  close($(".subTask-popup"), getCategory);
});

var completed = (event) => {
  console.log("className = ", event.target.parentElement.id);
  var element = event.target.parentElement.id;
  console.log(element);
  $("#" + element).addClass("task-done ");

  console.log("event", event.target);
  for (var item of todoItem) {
    for (let i = 0; i < item.subTask.length; i++) {
      if (item.subTask[i] === element) {
        console.log(
          "Present at " + i + " array index = " + todoItem.indexOf(item)
        );

        todoItem[todoItem.indexOf(item)].subTask.splice(i, 1);
      }
    }
  }


        event.target.style.display = "none";
        // $("#" + element).remove();
        };



//To close-->popup for subtask

    $(".subTask-popupclose").on("click", () => {

    close($(".subTask-popup"));
    
    }
    );