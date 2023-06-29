function importJSON() {
  return new Promise(function(resolve, reject) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';

    input.onchange = function(e) {
      var file = e.target.files[0];
      var reader = new FileReader();

      reader.onload = function() {
        var contents = reader.result;
        var jsonData = JSON.parse(contents);
        resolve(jsonData);
      };

      reader.onerror = function(error) {
        reject(error);
      };

      reader.readAsText(file);
    };

    input.click();
  });
}

  function validateJsonData({ data, validator}) {
    return data.map(validator).filter((element) => {
      return element !== true && element !== undefined;
    })
  }

  export function importData({ saveData, validator }) {
    return async () => {
      let data;
      try {
          data = await importJSON()
          const errorMessages = validateJsonData({data, validator});
          if(errorMessages.length !==0) alert(errorMessages);
      } catch (error) {
          alert(error)
      }

      // TODO save the locations to the indexedDB, how to handle if it fails in the meantime?



    };
  }