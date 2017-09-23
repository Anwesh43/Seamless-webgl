const stage = new Stage(500,500)
stage.init([0,0.5,
  -0.5,-0.5,
  0.5,-0.5],2)
stage.render([1,0,0])

const stage2 = new Stage(500,500)
stage2.init([-0.5,-0.5,
  0.5,-0.5,
  0.5,0.5,
  0.5,0.5,
-0.5,0.5,
-0.5,-0.5],2)
stage2.render([0,1,0])
