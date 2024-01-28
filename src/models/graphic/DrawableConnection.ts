import { CONNECTION_STROKE_WIDTH } from '../constants'
import { Connection } from '../io_gate/Connection'

class DrawableConnection {
  public connection: Connection
  public strokeWidth: number = CONNECTION_STROKE_WIDTH
  public middlePoints: Position[] = []
  public startPoint: Position
  public endPoint: Position

  constructor(connection: Connection) {
    connection.setGraphic(this)
    this.connection = connection

    this.startPoint = connection.a.gate.graphic!.position
    this.endPoint = connection.b.gate.graphic!.position
  }

  public getPoints(): number[] {
    const points = [this.startPoint.x, this.startPoint.y]

    this.middlePoints.forEach((pos) => {
      points.push(pos.x, pos.y)
    })

    points.push(this.endPoint.x, this.endPoint.y)
    return points
  }

  public getColor(): string {
    return this.connection.a.gate.graphic!.getColor()
  }

  public setPath(path: Position[]) {
    this.middlePoints = path
  }
}

export { DrawableConnection }
