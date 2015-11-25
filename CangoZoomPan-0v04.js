/*================================================================
  Filename: CangoZoomPan-0v04.js
  Rev 0
  By: A.R.Collins
  Description:
  Support function for zoom and pan controls

  Date    Description                                         By
  ---------------------------------------------------------------
  08Jan15 First beta                                          ARC
          Support an array of Cango contexts to zoom/pan      ARC
          Update to use Cango-5v31                            ARC
  09Feb15 Update to use Cango-6v00                            ARC
 ================================================================*/

  "use strict";

  if (typeof addLoadEvent === "undefined")
  {
    var addLoadEvent = function(func)
    {
    	var oldonload = window.onload;
    	if (typeof window.onload != 'function')
      {
        window.onload = func;
      }
    	else
      {
      	window.onload = function(){oldonload();	func();}
      }
    }
  }

  function initZoomPan(zpControlsId, gc, redraw)
  {
    var arw = ['m',-7,-2,'l',7,5,7,-5],
        crs = ['m',-6,-6,'l',12,12,'m',0,-12,'l',-12,12],
        pls = ['m',-7,0,'l',14,0,'m',-7,-7,'l',0,14],
        mns = ['m',-7,0,'l',14,0],
        zin, zout, rst, up, dn, lft, rgt,
        zpGC,
        gAry;

    function zoom(z)
    {
      function zm(g)
      {
        var org = g.toPixelCoords(0, 0),
            cx = g.rawWidth/2 - org.x,
            cy = g.rawHeight/2 - org.y;

        g.xoffset += cx - cx/z;
        g.yoffset += cy - cy/z;
        g.xscl /= z;
        g.yscl /= z;
      }

      gAry.forEach(zm);
      redraw();
    }

    function pan(sx, sy)
    {
      function pn(g)
      {
        g.xoffset -= sx;
        g.yoffset -= sy;
      }

      gAry.forEach(pn);
      redraw();
    }

    function resetZoomPan()
    {
      function rstzp(g)
      {
        g.xscl = g.savWC.xscl;
        g.yscl = g.savWC.yscl;
        g.xoffset = g.savWC.xoffset;
        g.yoffset = g.savWC.yoffset;
      }

      gAry.forEach(rstzp);
      redraw();
    }

    zpGC = new Cango(zpControlsId);
    // Zoom controls
    zpGC.clearCanvas();
    zpGC.setWorldCoords(-74,-40);

    rst = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    rst.enableDrag(null, null, resetZoomPan);
    zpGC.render(rst);

    rgt = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    // must always enable DnD before rendering !
    rgt.enableDrag(null, null, function(){pan(50, 0)});
    zpGC.render(rgt, 22, 0);

    up = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    up.enableDrag(null, null, function(){pan(0, -50)});
    zpGC.render(up, 0, 22);

    lft = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    lft.enableDrag(null, null, function(){pan(-50, 0)});
    zpGC.render(lft, -22, 0);

    dn = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    dn.enableDrag(null, null, function(){pan(0, 50)});
    zpGC.render(dn, 0, -22);

    zin = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    zin.enableDrag(null, null, function(){zoom(1/1.2)});
    zpGC.render(zin, -56, 11);

    zout = new Cobj(shapeDefs.rectangle(20, 20, 2), "SHAPE", {fillColor:"rgba(0,0,0,0.2)"});
    zout.enableDrag(null, null, function(){zoom(1.2)});
    zpGC.render(zout, -56, -11);

    zpGC.setPropertyDefault("strokeColor", "white");
    zpGC.setPropertyDefault("lineWidth", 2);
    arw = new Cobj(['m',-7,-2,'l',7,5,7,-5], "PATH");
    zpGC.render(arw, 0,22, 1, 0);
    zpGC.render(arw, 22,0, 1, -90);
    zpGC.render(arw, -22,0, 1, 90);
    zpGC.render(arw, 0,-22, 1, 180);
    zpGC.drawPath(pls, -56,11);
    zpGC.drawPath(mns, -56,-11);
    zpGC.drawPath(crs);

    if (Array.isArray(gc))
    {
      gAry = gc;
    }
    else
    {
      gAry = [];
      gAry[0] = gc;
    }
  };

