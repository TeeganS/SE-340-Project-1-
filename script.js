// Function to generate a random tracking ID (helper function)
function generateTrackingID() {
    return Math.floor(Math.random() * 1000000);
}

// Transport Interface (Product)
class Transport {
    constructor(distance, trackingID) {
        this.distance = distance;
        this.trackingID = trackingID;
    }
}

// Concrete Product Classes
class Plane extends Transport {
    deliver() {
        return "Delivering by air using a plane.";
    }
}

class Truck extends Transport {
    deliver() {
        return "Delivering by land using a truck.";
    }
}

class Train extends Transport {
    deliver() {
        return "Delivering by rail using a train.";
    }
}

class Ship extends Transport {
    deliver() {
        return "Delivering by sea using a ship.";
    }
}

// Mail Interface (Creator)
class Mail {
    createTransport(distance) {
        throw new Error("Method 'createTransport()' must be implemented.");
    }
}

// Concrete Creator for AirMail
class AirMail extends Mail {
    createTransport(distance) {
        return new Plane(distance, generateTrackingID());
    }
}

// Concrete Creator for GroundMail
class GroundMail extends Mail {
    createTransport(distance) {
        if (distance <= 400) {
            return new Truck(distance, generateTrackingID());
        } else {
            return new Train(distance, generateTrackingID());
        }
    }
}

// Concrete Creator for SeaMail with Internal Decision
class SeaMail extends Mail {
    createTransport(distance) {
        // Internal logic to decide between Ship and Plane
        if (distance <= 2000) {
            return new Ship(distance, generateTrackingID());
        } else {
            return new Plane(distance, generateTrackingID());
        }
    }
}

// Event listener for form submission
document.getElementById("transportForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const distance = parseInt(document.getElementById("distance").value);
    const overWater = document.getElementById("overWater").value;

    let mailService;

    // Factory Method Implementation
    if (overWater === "yes") {
        mailService = new SeaMail();  // Encapsulates decision for over-water transport
    } else {
        if (distance > 1000) {
            mailService = new AirMail();
        } else {
            mailService = new GroundMail();
        }
    }

    const transport = mailService.createTransport(distance);

    const transportList = document.getElementById("transports");
    const li = document.createElement("li");
    li.textContent = `Transport: ${transport.constructor.name}, Distance: ${distance} miles, Tracking ID: ${transport.trackingID} - ${transport.deliver()}`;
    transportList.appendChild(li);

    document.getElementById("transportForm").reset();
});
