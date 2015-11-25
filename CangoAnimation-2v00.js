/*==================================================================
  Filename: CangoAnimation-2v00.js
  Rev 2
  By: A.R.Collins
  Description:  This file augments the core Cango object with
                animation methods
  License: Released into the public domain
  latest version at
  <http://www/arc.id.au/>

  Date    Description                                          |By
  -----------------------------------------------------------------
  11May14 First release                                         ARC
  21Jul14 Updated to Cango-5 _buf becomes this.cnvs.buf         ARC
  24Jul14 Enable synchronised timeline for all layers
          Released as Version 2                                 ARC
 ==================================================================*/

var Timeline;

Cango = (function(CangoCore)  // Cango maust be declared a global before this file is loaded
{
  if (!Date.now)
  {
    Date.now = function now()
    {
      return new Date().getTime();
    };
  }

  var isArray = function(obj)
  {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  var isNumber = function(o)
  {
    return !isNaN(o) && o !== null && o !== "" && o !== false;
  };

  function interpolate(vals, t, dur)     // vals is an array of key frame values
  {
    var numSlabs, slabDur, slab, frac;

    if (isArray(vals))  // array
    {
      if (t == 0)
      {
        return vals[0];
      }
      if (t >= dur)
      {
        return vals[vals.length-1];  // freeze at end value
      }
      numSlabs = vals.length-1;
      slabDur = dur/numSlabs;
      slab = Math.floor(t/slabDur);
      frac = (t - slab*slabDur)/slabDur;
      return vals[slab] + frac*(vals[slab+1] - vals[slab]);
    }
    //  else single value (not animated)
    return vals;
  }

  function PathInterpolator(xVals, yVals, sclVals, rotVals, delayTime, duration, repeat)
  {
    var savThis = this,
        xValues = xVals || 0,
        yValues = yVals || 0,
        sclValues = sclVals || 1,
        rotValues = rotVals || 0;

    this.getState = function(time, state)   // reference to a state passed to avoid creating new objects
    {
      var localTime, t;

      if (time == 0)   // re-starting after a stop
      {
        savThis.startTime = 0;
      }
      localTime = time - savThis.startTime;       // handles local looping
      if ((localTime > savThis.dur+savThis.delay) && (savThis.dur > 0) && savThis.loop)  // dur = 0 go forever
      {
        savThis.startTime = time;   // we will re-start
        localTime = 0;      // this will force re-start at frame 0
      }
      t = 0;
      if (localTime > savThis.delay)  // repeat initial frame if there is a delay to start
      {
        t = localTime - savThis.delay;
      }
      if (isArray(xValues))
      {
        state.x = interpolate(xValues, t, savThis.dur);
      }
      else
      {
        state.x = xValues;      // single value or null
      }
      if (isArray(yValues))
      {
        state.y = interpolate(yValues, t, savThis.dur);
      }
      else
      {
        state.y = yValues;      // single value or null
      }
      if (isArray(sclValues))
      {
        state.scl = interpolate(sclValues, t, savThis.dur);
      }
      else
      {
        state.scl = sclValues;  // single value or null
      }
      if (isArray(rotValues))
      {
        state.rot = interpolate(rotValues, t, savThis.dur);
      }
      else
      {
        state.rot = rotValues;  // single value or null
      }
    };

    this.delay = delayTime || 0;
    this.dur = duration || 0;     // 0 = go forever
    this.loop = repeat || false;
    this.startTime = 0;
  }

  function Animation(id, gCtx, obj, pathFn)
  {
    this.id = id;
    this.gc = gCtx;                          // the Cango context to do the drawing
    this.obj = obj;
    this.pathFn = pathFn;         // root object (Obj2D or Group2D) of scene to be draw
  }

  Timeline = function()
  {
    this.animTasks = [];    // each layer can push an Animation object in here
    this.timer = null;                // need to save the rAF id for cancelling
    this.modes = {PAUSED:1, STOPPED:2, PLAYING:3, STEPPING:4};     // animation modes
    this.animMode = this.modes.STOPPED;
    this.prevAnimMode = this.modes.STOPPED;
    this.startTime = 0;               // animation start time (relative to 1970)
    this.currTime = 0;                // timestamp of frame on screen
    this.stepTime = 50;               // animation step time interval (in msec)
  }

  Timeline.prototype.stopAnimation = function()
  {
    window.cancelAnimationFrame(this.timer);
    this.prevAnimMode = this.animMode;
    this.animMode = this.modes.STOPPED;
    // reset the currTime so play and step know to start again
    this.currTime = 0;
  };

  Timeline.prototype.pauseAnimation = function()
  {
    window.cancelAnimationFrame(this.timer);
    this.prevAnimMode = this.animMode;
    this.animMode = this.modes.PAUSED;
  };

  Timeline.prototype.stepAnimation = function()
  {
    var savThis = this,
        nextState = {x:0, y:0, scl:1, rot:0};

    // this is the actual animator that draws the frame
    function drawIt()
    {
      var temp, i, at,
          prevAt = null,
          localTime,
          time = Date.now();    // use this as a time stamp, browser don't all pass the same time code

      if (savThis.prevAnimMode == savThis.modes.STOPPED)
      {
        savThis.startTime = time;                // forces localTime = 0 to start from beginning
      }
      localTime =  time - savThis.startTime;

      // step through all the animation tasks
      for (i=0; i<savThis.animTasks.length; i++)
      {
        at = savThis.animTasks[i];
        if (at.gc.cId !== prevAt)
        {
          // check for new layer, only clear a layer once, there maybe several Cango contexts on each canvas
          at.gc.clearCanvas();
          prevAt = at.gc.cId;
        }
        if (at.gc.buffered)
        {
          // drawing will be off screen, clear buffer
          at.gc.bufCtx.clearRect(0, 0, at.gc.rawWidth, at.gc.rawHeight);
          // swap buffers while drawing done off scrreen
          temp = at.gc.ctx;
          at.gc.ctx = at.gc.bufCtx;
        }
        at.pathFn.getState(localTime, nextState);
        at.gc.render(at.obj, nextState.x, nextState.y, nextState.scl, nextState.rot);
        if (at.gc.buffered)
        {
          // drawing done, switch them back
          at.gc.ctx = temp;
          // now bit-blt the image in buffer to the on-screen canvas (all drawing over written)
          at.gc.ctx.drawImage(at.gc.cnvs.buf, 0, 0);
        }
      }

      savThis.currTime = localTime;      // timestamp of what is currently on screen
      savThis.prevAnimMode = savThis.modes.PAUSED;
      savThis.animMode = savThis.modes.PAUSED;
    }

    // eqivalent to play for one frame and pause
    if (this.animMode == this.modes.PLAYING)
    {
      return;
    }
    if (this.animMode == this.modes.PAUSED)
    {
      this.startTime = Date.now() - this.currTime;  // move time as if currFrame just drawn
    }
    this.prevAnimMode = this.animMode;
    this.animMode = this.modes.STEPPING;

    setTimeout(drawIt, this.stepTime);
  };

  Timeline.prototype.playAnimation = function()
  {
    // this.animationObj and its family tree get drawn each frame any object with
    // animateTransform set have had their tweener added to the ofsTfmAry
    // When rendered the Tweener getMatrix is called and its matrix applied like any
    // other transform. All getMatrix calls get passed the same value of localtime
    // each frame to keep sync.
    // this routine is the 'stepper' from timeline
    var savThis = this,
        nextState = {x:0, y:0, scl:1, rot:0};

    // this is the actual animator that draws each frame
    function drawIt()
    {
      var temp, i, at,
          prevAt = null,
          localTime,
          time = Date.now();    // use this as a time stamp, browser don't all pass the same time code

      if (savThis.prevAnimMode == savThis.modes.STOPPED)
      {
        savThis.startTime = time;                // forces localTime = 0 to start from beginning
      }
      localTime =  time - savThis.startTime;

      // step through all the animation tasks
      for (i=0; i<savThis.animTasks.length; i++)
      {
        at = savThis.animTasks[i];
        if (at.gc.cId !== prevAt)
        {
          // check for new layer, only clear a layer once, there maybe several Cango contexts on each canvas
          at.gc.clearCanvas();
          prevAt = at.gc.cId;
        }
        if (at.gc.buffered)
        {
          // drawing will be off screen, clear buffer
          at.gc.bufCtx.clearRect(0, 0, at.gc.rawWidth, at.gc.rawHeight);
          // swap buffers while drawing done off scrreen
          temp = at.gc.ctx;
          at.gc.ctx = at.gc.bufCtx;
        }
        at.pathFn.getState(localTime, nextState);
        at.gc.render(at.obj, nextState.x, nextState.y, nextState.scl, nextState.rot);
        if (at.gc.buffered)
        {
          // drawing done, switch them back
          at.gc.ctx = temp;
          // now bit-blt the image in buffer to the on-screen canvas
          at.gc.ctx.drawImage(at.gc.cnvs.buf, 0, 0);
        }
      }

      savThis.currTime = localTime;      // timestamp of what is currently on screen
      savThis.prevAnimMode = savThis.modes.PLAYING;
      savThis.timer = window.requestAnimationFrame(drawIt);
    }

    if (this.animMode == this.modes.PLAYING)
    {
      return;
    }
    if (this.animMode == this.modes.PAUSED)
    {
      this.startTime = Date.now() - this.currTime;  // move time as if currFrame just drawn
    }

    this.prevAnimMode = this.animMode;
    this.animMode = this.modes.PLAYING;

    this.timer = window.requestAnimationFrame(drawIt);
  };

//===============================================================================

  // flag Cango to create off screen buffer for each instance
  CangoCore.prototype.buffered = true;

  CangoCore.prototype.animate = function(obj, xValues, yValues, sclValues, rotValues, delayTime, duration, loopStr)
  {
    var delay = delayTime || 0,
        dur = duration || 0,     // 0 = go forever
        loop = false,
        animObj,
        path,
        animId;

    if ((loopStr != undefined)&&(loopStr == 'loop'))
    {
      loop = true;
    }
    path = new PathInterpolator(xValues, yValues, sclValues, rotValues, delay, dur, loop);
    // give it a unique ID
    animId = this.cId+"_"+this.getUnique();
    animObj = new Animation(animId, this, obj, path);
    // push this into the Cango animations array
    this.stopAnimation();   // make sure we are not still running and old animation
    this.bkgCanvas.timeline.animTasks.push(animObj);

    return animObj.id;   // so the animation just created can be deleted if required
  };

  CangoCore.prototype.pauseAnimation = function()
  {
    this.bkgCanvas.timeline.pauseAnimation();
  };

  CangoCore.prototype.playAnimation = function()
  {
    this.bkgCanvas.timeline.playAnimation();
  };

  CangoCore.prototype.stopAnimation = function()
  {
    this.bkgCanvas.timeline.stopAnimation();
  };

  CangoCore.prototype.stepAnimation = function()
  {
    this.bkgCanvas.timeline.stepAnimation();
  };

  CangoCore.prototype.deleteAnimation = function(animId)
  {
    var idx = -1,
        i;

    this.stopAnimation();
    for (i=0; i<this.bkgCanvas.timeline.animTasks.length; i++)
    {
      if (this.bkgCanvas.timeline.animTasks[i].id == animId)
      {
        idx = i;
        break;
      }
    }
    if (idx == -1)
    {
      // not found
      return;
    }
    this.bkgCanvas.timeline.animTasks.splice(idx,1);       // delete the animation object
  };

  CangoCore.prototype.deleteAllAnimations = function()
  {
    this.stopAnimation();
    this.bkgCanvas.timeline.animTasks = [];
  };

  return CangoCore;    // return the augmented Cango object, over-writing the existing

}(Cango));     // Take the existing Cango object and add animation methods

 /*-----------------------------------------------------------------------------------------*/

(function()
{
  /*-----------------------------------------------------------------------------------------
   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   * http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
   * requestAnimationFrame polyfill by Erik Möller
   * fixes from Paul Irish and Tino Zijdel
   *----------------------------------------------------------------------------------------*/

  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  var x;
  for(x = 0; x < vendors.length && !window.requestAnimationFrame; ++x)
  {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
  {
    window.requestAnimationFrame = function(callback)
    {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function(){callback(currTime + timeToCall);}, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame)
  {
    window.cancelAnimationFrame = function(id) {clearTimeout(id);};
  }

}());


