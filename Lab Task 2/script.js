function loadingStories() {
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories",
    method: "GET",
    datatype: "json",
    error: function (response) {
      console.error("Error occured: ", error);
    },

    success: successResponse,
  });
}

// DISPLAY
function successResponse(response) {
  var list = $("#storiesList");
  $("#storiesList").empty();

  $.each(response, function (index, stories) {
    list.append(
      `<div class="mb-3">
                    <h3 class="fw-bold mb-2">${stories.title}</h3>
                    <div class="text-muted">${stories.content}</div>
      
                    <div>
                    <button class="btn btn-outline-info btn-sm rounded mr-2 btn-edit mt-3" id="editBtn" data-id="${stories.id}">Edit</button>

                    <button class="btn btn-outline-danger btn-sm rounded mr-2 btn-del mt-3" data-id="${stories.id}" id="deleteBtn">Delete</button>

                    </div>
                </div><hr />`
    );
    $(".loadingStories").css("display", "none");
  });
}

loadingStories();

// DELETE
$("#storiesList").on("click", "#deleteBtn", function(){
    console.log("delete btn clicked");
    var deleteStory = $(this).data("id");
    console.log("delete btn clicked on: " + deleteStory);
    $.ajax({
        url: 'https://usmanlive.com/wp-json/api/stories/' + deleteStory,
        method: "DELETE",
        datatype: "json",
        error: function(response){
            console.error("Error occured: " + error);
        },
        success: function(){
            loadingStories();
        }

    })
});

// EDIT (PART 1)
$("#storiesList").on("click", "#editBtn", function(event){
  event.preventDefault();
  let id = $(this).attr("data-id");
  console.log("hehehehe");
  console.log(id);

  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + id,
    method: "GET",
    datatype: "json",
    success: function(response){
      $("#createTitle").val(response.title);
      $("#createContent").val(response.content);
      // $("#clearBtn").show();
      $("#createBtn").html("Update");
      $("#createBtn").attr("data-id", response.id);
      console.log(response);
    },
    error: function(){
      console.error("Error occured: ", error);
    },
  });
})

// EDIT (PART 2)
$("#createBtn").on("click", function(event){
  let id = $("#createBtn").attr("data-id");
  var title = $("#createTitle").val();
  var content = $("#createContent").val();

  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + id,
    method: "PUT",
    datatype: "json", 
    data: {title, content},
    success: function(){
      $("#createBtn").html("Create");
      loadingStories();
    },

    error: function(){
      console.log("Error occured: " , error);
    }
  })
})


// POST
$("#createBtn").on("click", function(event){
  event.preventDefault();
  var title = $("#createTitle").val();
  var content = $("#createContent").val();
  console.log(title, content);

  $.ajax({
      url: 'https://usmanlive.com/wp-json/api/stories',
      method: "POST",
      datatype: "json",
      data: {title, content},
      success: function(){
          loadingStories();
      },
      error: function(){
          console.error("Error occured: ", error);
      },
  });
})

