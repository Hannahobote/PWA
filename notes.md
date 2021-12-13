### icon.js
when icon is pressed, window should pop up
- its only repsonibility should be taking in an image for the icon image

### window.js
[] windows should contain an app of choice FULLY USABLE
[] window should be dragable 

#### Dock.js
should contain icons 

The icon should be on the dock. The icon should include the windwow, that incluted the app.

create app ( window + desierd app) through idex.js ??? on click???


  dragStart(e) {
    if (e.type === "touchstart") {
      this.initialX = e.touches[0].clientX - this.xOffset;
      this.initialY = e.touches[0].clientY - this.yOffset;
    } else {
      this.initialX = e.clientX - this.xOffset;
      this.initialY = e.clientY - this.yOffset;
    }

    if (e.target === this.dragItem) {
      this.active = true;
    }
  }

  dragEnd(e) {
    this.initialX = this.currentX;
    this.initialY = this.currentY;

    this.active = false;
  }

  drag(e) {
    if (this.active) {
    
      e.preventDefault();
    
      if (e.type === "touchmove") {
        this.currentX = e.touches[0].clientX - this.initialX;
        this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        this.currentX = e.clientX - this.initialX;
        thi.currentY = e.clientY - this.initialY;
      }

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      setTranslate(this.currentX, this.currentY, this.dragItem);
    }
  }

  setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }