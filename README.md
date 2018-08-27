# RC Toy Robot

Remote control toy robot.

## Prerequisites

Built with ReactJs, Yarn and Webpack, tested with Mocha

## Build

```
yarn build
```

## Test

```
yarn test 
```

## Start sever

```
yarn start 
```

## Running the program

The application allows to send commands to a remote control robot by using a CLI or web interface. The web interface is 
automatically updated when the state of the robot changes via the CLI.

Access the web interface:  
Go to **http://localhost:3000/** after starting the server.

Running a CLI command:
```
yarn cli <action> [options]
```

__List of actions__:

* __Report__: Display the robot report.

```
yarn cli report
```

* __Place__: Place the robot on grid with x (from 0 to 4), y (from 0 to 4) 
and facing (north, south, west, east) options.

```
yarn cli place --x 0 --y 0 --facing south
```

* __Move__: Move robot forward.

```
yarn cli move
```

* __Left__: Rotate robot left.

```
yarn cli left
```

* __Right__: Rotate robot right.

```
yarn cli right
```

* __Help__: Display action help.

```
yarn cli <action> --help
```

## Development

Run React without the server:
```
yarn start-ui-dev
```

Run the full stack application:
```
yarn start-dev
```