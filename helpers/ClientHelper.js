/*
 * The client helper allows the client to connect to the backend server
 */


/*
 * Check the server response
 */
const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

/*
 * Parse the server response
 */
const parseJson= (response) => {
    return response.json()
}

/*
 * Get robot report from server
 */
const getRobotReport = (success) => {
    return fetch('/robot/report', {
        headers: {
            Accept: 'application/json',
        },
    }).then(checkStatus)
        .then(parseJson)
        .then(success)
};

/*
 * Update robot position and direction on server
 */
const placeRobot = (data) => {
    return fetch('/robot/place', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(checkStatus)
};

/*
 * Update robot position on server
 */
const moveRobot = (data) => {
    return fetch('/robot/move', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(checkStatus)
};

/*
 * Update robot direction on server
 */
const rotateRobot = (data) => {
    return fetch('/robot/rotate', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).then(checkStatus)
};

/*
 * Subscribe to report updates (using Server Sent Events)
 */
const subscribeToReports = (success) => {
    const eventSource = new EventSource('/robot/report/stream')
    eventSource.onmessage = (e) => {
        success(e.data)
    }
}

module.exports = {
    placeRobot,
    getRobotReport,
    moveRobot,
    rotateRobot,
    subscribeToReports
}