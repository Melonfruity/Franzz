import React, { Component } from 'react';
import { v4 } from 'uuid';
import Pusher from 'pusher-js';

class Canvas extends Component {
      isPainting = false;

      // Different stroke styles to be used for user and guest
      userStrokeStyle = '#EE92C2';

      guestStrokeStyle = '#F0C987';

      line = [];

      // v4 creates a unique id for each user.
      // We used this since there's no auth to tell users apart
      userId = v4();

      prevPos = { offsetX: 0, offsetY: 0 };

      constructor(props) {
        super(props);
        this.state = {
          line: [],
        };
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endPaintEvent = this.endPaintEvent.bind(this);
        this.pusher = new Pusher('0609165026115fbd973a', {
          cluster: 'mt1',
          forceTLS: true,
        });
        console.log(this.pusher);
        console.log(props)
        console.log(this.props.channel)
      }

      componentDidMount() {
        // Here we set up the properties of the canvas element.
        this.canvas.width = 650;
        this.canvas.height = 392;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 4;

        const channel = this.pusher.subscribe(`${this.props.channel}`);
        console.log(channel)
        channel.bind('draw', (data) => {
          const { userId, line } = data;
          console.log(data)
          if (userId !== this.userId) {
            line.forEach((position) => {
              this.paint(position.start, position.stop, this.guestStrokeStyle);
            });
          }
        });
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
          this.setState({ line: this.line });
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
        const body = {
          line: this.state.line,
          userId: this.userId,
          channel: this.props.channel,
        };
        // We use the native fetch API to make requests to the server
        const req = await fetch('http://localhost:8001/api/pusher/paint', {
          method: 'post',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json',
          },
        });
        const res = await req.json();
        console.log(res);
        this.line = [];
      }

      render() {
        return (
          <canvas
          // We use the ref attribute to get direct access to the canvas element.
            ref={(ref) => (this.canvas = ref)}
            style={{ background: 'black' }}
            onMouseDown={this.onMouseDown}
            onMouseLeave={this.endPaintEvent}
            onMouseUp={this.endPaintEvent}
            onMouseMove={this.onMouseMove}
          />
        );
      }
}
export default Canvas;
