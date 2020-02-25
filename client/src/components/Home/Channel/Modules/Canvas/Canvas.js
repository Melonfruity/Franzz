import React, { Component } from 'react';

class Canvas extends Component {
      isPainting = false;

      // Different stroke styles to be used for user and guest
      userStrokeStyle = '#EE92C2';

      guestStrokeStyle = '#F0C987';

      line = [];

      prevPos = { offsetX: 0, offsetY: 0 };

      constructor(props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.sendLine = props.sendLine.bind(this);
      }

      componentDidMount() {
        // Here we set up the properties of the canvas element.
        this.canvas.width = 1000;
        this.canvas.height = 800;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 5;
      }

      componentDidUpdate(prevProps) {
        const { currentUser, lines } = this.props;
        if (lines !== undefined) {
          console.log(lines)
          Object.values(lines).forEach(({ user, line }) => {
            if (user !== currentUser) {
              line.forEach((position) => {
                console.log(position);
                this.paint(position.start, position.stop, this.guestStrokeStyle);
              });
            }
          });
        }
      }

      onMouseDown({ nativeEvent }) {
        const { offsetX, offsetY } = nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
      }

      onMouseMove({ nativeEvent }) {
        if (this.isPainting) {
          const { offsetX, offsetY } = nativeEvent;
          const offSetData = { offsetX, offsetY };
          // Set the start and stop position of the paint event.
          const positionData = {
            start: { ...this.prevPos },
            stop: { ...offSetData },
          };
          // Add the position to the line array
          this.line = this.line.concat(positionData);
          this.paint(this.prevPos, offSetData, this.userStrokeStyle);
        }
      }

      endPaintEvent() {
        if (this.isPainting) {
          this.isPainting = false;
          this.sendPaintData();
        }
      }

      paint(prevPos, currPos, strokeStyle) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;

        this.ctx.beginPath();
        this.ctx.strokeStyle = strokeStyle;
        // Move the the prevPosition of the mouse
        this.ctx.moveTo(x, y);
        // Draw a line to the current position of the mouse
        this.ctx.lineTo(offsetX, offsetY);
        // Visualize the line using the strokeStyle
        this.ctx.stroke();
        this.prevPos = { offsetX, offsetY };
      }

      async sendPaintData() {
        this.sendLine(this.line);
      }

      render() {
        return (
          <>
            <canvas
            // We use the ref attribute to get direct access to the canvas element.
              ref={(ref) => (this.canvas = ref)}
              style={{ background: 'black' }}
              onMouseDown={this.onMouseDown}
              onMouseLeave={this.endPaintEvent}
              onMouseUp={this.endPaintEvent}
              onMouseMove={this.onMouseMove}
            />
          </>
        );
      }
}
export default Canvas;
