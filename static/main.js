function addCheckpoint() {
    let checkpoint = document.createElement("INPUT");
    let checkpoints = document.getElementsByClassName("checkpoint");
    checkpoint.id = "checkpoint" + (checkpoints.length + 1);
    checkpoint.className = "checkpoint"
    checkpoints[0].parentNode.insertBefore(checkpoint, checkpoints[checkpoints.length - 1].nextSibling);
  }

  function removeCheckpoint() {
    let checkpoints = document.getElementsByClassName("checkpoint");
    console.log(checkpoints);
    if (checkpoints.length > 1) {
      document.getElementById(checkpoints[checkpoints.length - 1].id).remove();
    } else {
      alert("You cannot remove the only checkpoint")
    }
  }
