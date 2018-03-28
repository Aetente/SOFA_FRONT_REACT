//TODO надо засунуть внешние функции в реакт
let initMap=null;
const theUrl = "https://olimshelper.herokuapp.com/";//api
const MIN_KM = 1;
const MAX_KM = 10;
const INC = 1;
let stepColors = [
    "#00508c",
    "#35a000",
    "#c67a00",
    "#a00092",
    "#ba1a00",
    "#3a008c",
    "#d29600",
    "#ba002b",
    "#50008c"
];//colors for steps
let map = null;//google maps
let myMarker = null;//the marker which shows your location
let markers = [];//markers on map
let bounds = null;

let icons = [
    "images/mk_grey.png",
    "images/mk_step_01.png",
    "images/mk_step_02.png",
    "images/mk_step_03.png",
    "images/mk_step_04.png",
    "images/mk_step_05.png",
    "images/mk_step_06.png",
    "images/mk_step_07.png",
    "images/mk_step_08.png",
    "images/mk_step_09.png",
    "images/ic_my_location.png"
];//icons for markers
let geocoder;//with this you decode placeId to get more information
let closeBtnText = {
    en: "X",
    ru: "X",
    he: "X",
    fr: "X"
    // en: "CLOSE",
    // ru: "ЗАКРЫТЬ",
    // he: "לסגור",
    // fr: "FERMER"
};
let closeImg =  'images/ic_action_close.png';
let showRouteBtnText = {
    en: "ROUTE",
    ru: "МАРШРУТ",
    he: "דרך",
    fr: "ROUTE"
};
let showRouteImg = 'images/ic_action_navigate.png';
let goToTheSiteBtnText = {

    en: "SITE",
    ru: "САЙТ",
    he: "האתר",
    fr: "SITE WEB"
};
let goToTheSiteImg = 'images/ic_action_link.png'
let phonesText = {
    en: "PHONES",
    ru: "ТЕЛЕФОНЫ",
    he: "טלפונים",
    fr: "TELEPHONES"
};
let scheduleText = {
    en: "SCHEDULE",
    ru: "РАСПИСАНИЕ",
    he: "לוח זמנים",
    fr: "HORAIRE"
};
let myLocationText = {
    en: "my location",
    ru: "мое расположение",
    he: "המיקום שלי",
    fr: "mon emplacement"
};
let weekDay = {
    en: [
        "sun", "mon", "tue", "wed", "thu", "fri", "sat"
    ],
    ru: [
        "вск", "пон", "втр", "срд", "чтв", "птн", "сбт"
    ],
    he: [
        "א", "ב", "ג", "ד", "ה", "ו", "ש"
    ],
    fr: [
        "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"
    ],
};//this will be required when you look info about marker
let fullLangName = {
    en: "English",
    ru: "Russian",
    he: "Hebrew",
    fr: "French"
}
//options for google maps
var options = {
    enableHighAccuracy: true,
    maximumAge: 0
};
let cityList = [];//the list of cities which will appear when geolocation is locked
let currentCity;
let showTheInfo = false;
let toConsole = true;











class LoadingWindow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div class="loading-window">
            <p class="loading-text">LOADING...</p>
        </div>
    }
}

class IconImage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <h4 class="hold-main-pic margin-to-zero"><img height="19" src="images/splash_logo.png" alt="SOFA"/></h4>;
    }
}

class Title extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "10 STEPS OF A NEW REPRESENTATIVE",
            currentCity: this.props.currentCity
        }
    }

    updateTitle = (newTitle) => {
        this.setState({title: newTitle})
    }

    render() {
        return <h4 class="title-text set-margin-for-header">{this.state.title}</h4>;
    }
}

class LocationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCityIndex: this.props.currentCity.split("|")[2],
            currentCity: this.props.currentCity.split("|")[0] + "|" + this.props.currentCity.split("|")[1]
        }
    }

    onCityChange = (e, lang, step) => {
        let theCurrentCity = e.target.value;
        let theCurrentCityParts = theCurrentCity.split("|");
        let theCurrentCityWithoutI = theCurrentCityParts[0] + "|" + theCurrentCityParts[1];
        if (theCurrentCity != "0") {
            let coords = theCurrentCity.split("|");
            let lat = +coords[0];
            let lon = +coords[1];
            this.props.changeGlobalPosition(lat, lon);
            this.props.changePosition(lat, lon, lang, step);
            this.setState({
                currentCity: theCurrentCityWithoutI,
                currentCityIndex: +coords[2]
            });
        }
        else {
            console.log(this.props)
            navigator.geolocation.getCurrentPosition(
                function (pos) {
                    return this.props.successMap(pos, lang, step)
                }.bind(this),
                function (err) {
                    return this.props.errorMap(err, lang, step)
                }.bind(this),
                options);//get location
            this.setState({currentCity: "0"})
        }
    }

    eachCity = (city, i) => {
        let strCoords = city.latitude + "|" + city.longitude;
        let strCoordsI = strCoords + "|" + i;
        let currentCityParts = this.state.currentCity.split("|");
        let currentCityWithoutI = currentCityParts[0] + "|" + currentCityParts[1];
        if (strCoords == currentCityWithoutI) {
            return <option selected value={strCoords} name={city.name}>{city.name}</option>
        }
        else {
            return <option value={strCoords} name={city.name}>{city.name}</option>
        }
    }

    render() {

        if (this.state.currentCity == "null|undefined") {

            return <div class="hold-list-div">
                <div class="control-list-div">
                    <select
                        value={this.props.currentCity.split("|")[0] + "|" + this.props.currentCity.split("|")[1]}
                        class="the-list"
                        onChange={((e) => this.onCityChange(e, this.props.nowLanguage, this.props.currentStep))}
                    >
                        <option value="0"
                                name={myLocationText[this.props.nowLanguage]}>{myLocationText[this.props.nowLanguage]}</option>
                        {this.props.cityList.map(this.eachCity)}
                    </select>
                </div>
            </div>
        }
        else {
            return <div class="hold-list-div">
                <div class="control-list-div">
                    <select
                        value={this.state.currentCity}
                        class="the-list"
                        onChange={((e) => this.onCityChange(e, this.props.nowLanguage, this.props.currentStep))}
                    >
                        <option value="0"
                                name={myLocationText[this.props.nowLanguage]}>{myLocationText[this.props.nowLanguage]}</option>
                        {this.props.cityList.map(this.eachCity)}
                    </select>
                </div>
            </div>
        }
    }
}

class CityList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cityList: [],
            cityValueList: []
        }
    }

    eachCity = (city, i) => {
        return <option value={this.state.cityValueList[i]}>{city}</option>
    };

    upadateCityList = (newCityList, newCityValues) => {
        this.setState({
            cityList: newCityList,
            cityValueList: newCityValues
        });
    };

    render() {
        return <div class="hold-search margin-to-zero">
            <div class="control-list-div">
                <LocationList
                    changePosition={this.props.changePosition}
                    successMap={this.props.successMap}
                    errorMap={this.props.errorMap}
                    cityList={this.props.cityList}
                    currentCity={this.props.currentCity}
                    changeGlobalPosition={this.props.changeGlobalPosition}
                    nowLanguage={this.props.nowLanguage}
                    currentStep={this.props.currentStep}
                />
            </div>
        </div>;
    }
}

class Languages extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div class="languages">
            <p><a class="changeLang pointable" onClick={() => {
                this.props.setLanguage("en")
            }} id="en">EN</a></p>
            <p><a class="changeLang pointable" onClick={() => {
                this.props.setLanguage("ru")
            }} id="ru">RU</a></p>
            <p><a class="changeLang pointable" onClick={() => {
                this.props.setLanguage("he")
            }} id="he">HE</a></p>
            <p><a class="changeLang pointable" onClick={() => {
                this.props.setLanguage("fr")
            }} id="fr">FR</a></p>
        </div>;
    }
}

class TextSize extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div class="textSize">
            <p id="plus-text" onClick={() => {
                this.props.resizeText(0.1)
            }} class="resizeText pointable">+</p>
            <p>A</p>
            <p id="minus-text" onClick={() => {
                this.props.resizeText(-0.1)
            }} class="resizeText pointable">-</p>
        </div>;
    }
}

class SofaStepHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoBtnText: ["INFO", "MARKERS"],
            nowInfoIndex: 0
        };
        this.onInfoBtnClick = this.onInfoBtnClick.bind(this);
        // this.updateStepHeadName = this.updateStepHeadName.bind(this);
    }

    updateInfoBtnText = () => {
        this.setState({nowInfoIndex: (++this.state.nowInfoIndex) % 2})
    };

    onInfoBtnClick() {
        showTheInfo = !showTheInfo;
        // toggleShowInfo(showTheInfo);
        this.props.showInfoCallback();
        this.updateInfoBtnText();
    }

    render() {
        return <div class="step-header" style={{backgroundColor: stepColors[this.props.currentStep]}}>
            <img class="step-img" src={"images/step_0" + (this.props.currentStep + 1) + ".png"}/>
            <p class="step-head">{this.props.steps[this.props.currentStep].title.toUpperCase()}</p>
            <p onClick={this.onInfoBtnClick}
               class="info-head pointable">{this.state.infoBtnText[this.state.nowInfoIndex]}</p>
        </div>
    }
}

class InfoOfStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toShow: this.props.toShow
        }
    }

    updateDescriptionText = (newDescriptionText) => {
        this.setState({descriptionText: newDescriptionText})
    };
    updateStepNeedText = (newStepNeedText) => {
        this.setState({stepNeedText: newStepNeedText})
    };

    toggleShowInfo = () => {
        this.setState({toShow: !this.state.toShow});
    }

    render() {
        return <div class={"info-of-step " + this.props.infoTextClass}
                    style={{"font-size": this.props.textSize + "em"}}>
            <div class="description-text">{this.props.steps[this.props.currentStep].description}</div>
            <div class="step-need">{this.props.steps[this.props.currentStep].need}</div>
        </div>
    }
}

class HelpDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addressList: []
        }
    }

   highlightMarker=(n)=> {//highlight the chosen marker
        for (let i = 0; i < markers.length; i++) {
            if (i != n) {//if it is not our marker
                var icon = {
                    url: icons[0], // url
                    scaledSize: new google.maps.Size(20, 30), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                };//new icon(grey one)
                markers[i].setIcon(icon);//set the grey icon
            }
            else {
                markers[i].setZIndex(1);
            }
        }
    }

    onAddressClick = (place, i) => {
        this.props.toggleMarkerInfo(place, true);
        this.props.closeCurrentMarker(this.props.currentStep);
        this.highlightMarker(i);
    }

    compareAddressLists = (a, b) => {
        if (a.length != b.length) {
            return true;
        }
        if (a.length == 0 && b.length == 0) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return true;
            }
        }
        return false;
    }

    async gCL(geocoder, placesArr) {
        //FIXME first you should fill placesArr but now it updates everytime it gets address 
        let setPlacesArr = (pA) => placesArr = pA;
        this.props.places.forEach((place) => {
            geocoder.geocode({"placeId": place.placeId},//decode the placeId to get address
                function (what, res, status) {
                    placesArr.push(this.geocodeFunc(what, res, status));
                    this.setState({addressList: placesArr})
                }.bind(this, placesArr)
            );

        }, this);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.compareAddressLists(this.props.places, prevProps.places)) {
            let placesArr = [];
            let hoho = async () => {
                this.gCL(geocoder, placesArr);
                // this.setState({addressList: placesArr})
            };
            hoho();
        }
    }

    geocodeFunc = (what, res, status) => {
        if (status == "OK") {
            let aC = res[0].address_components;
            return `${aC[2].long_name}, ${aC[1].short_name}, ${aC[0].short_name}`;
        }
        else {
            console.log(status);
            return "address error";
        }
    }

    eachAddress = (place, i) => {
        let addressString = "";
        return <div class={"sofa-address pointable marker" + i} onClick={() => this.onAddressClick(place, i)}>
            <img class="img-place" height="24" width="24"
                 src={`http://www.google.com/s2/favicons?domain=${place.url}`}/>
            <h5 class="name-place">{place.name}</h5>
            <p class="expand-button">V</p>
            <p class="address-name">{this.state.addressList[i]}</p>
        </div>
    }

    async asyncRender() {
        return <div class={this.props.classText}>
            {async () => this.props.places.map(this.eachAddress)}
        </div>
    }

    render() {
        return <div class={this.props.classText}>
            {this.props.places.map(this.eachAddress)}
        </div>
    }
}

class InfoAboutMarker extends React.Component {

    constructor(props) {
        super(props);
    }

    eachPhone = (phone) => {
        return <div class="div-to-make-flex-work">
            <p class="make-flex">{phone}</p>
        </div>
    }

    eachSchedule = (day, i) => {
        return <div class="marker-info">
            <p class="make-flex">
                {weekDay[this.props.nowLanguage][i]}
            </p>
            <p class="make-flex">
                {day}
            </p>
        </div>
    }

    render() {
        return <div class="info-of-marker">
            <div class="marker-holder">
                <img
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${myMarker.getPosition().lat()},${myMarker.getPosition().lng()}&destination=${this.props.place.latitude},${this.props.place.longitude}`, `_blank`)}
                    class="marker-btn" src={showRouteImg} alt={showRouteBtnText[this.props.nowLanguage]} />
                <img onClick={() => window.open("http://" + this.props.place.url, "_blank")}
                        class="marker-btn" src={goToTheSiteImg} alt={goToTheSiteBtnText[this.props.nowLanguage]}/>
                <img onClick={() => {
                    this.props.toggleMarkerInfo(null, false);
                    this.props.closeCurrentMarker(this.props.currentStep);
                }} class="marker-btn pointable" src={closeImg} alt={closeBtnText[this.props.nowLanguage]}/>
            </div>
            <div class="div-to-make-flex-work">
                <h5 class="make-flex">{this.props.place.name}</h5>
            </div>
            <h6>{phonesText[this.props.nowLanguage]}</h6>
            {this.props.place.phones.map(this.eachPhone)}
            <h6>{scheduleText[this.props.nowLanguage]}</h6>
            {this.props.place.schedule.map(this.eachSchedule)}
        </div>
    }
}

class DescriptionOfStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toShowMarkerInfo: false,
            place: null
        }
    }

    unhighlightMarkers=(step)=> {//unhilight all markers
        for (let i = 0; i < markers.length; i++) {
            var icon = {
                url: icons[step + 1], // url
                scaledSize: new google.maps.Size(20, 30), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };//the icon according to current step
            markers[i].setIcon(icon);//set the icon
            markers[i].setZIndex(0);
        }
    }

    closeCurrentMarker=(step)=> {//close the clicked marker
        this.unhighlightMarkers(step);
    }


    componentWillReceiveProps = () => {
        this.setState({toShowMarkerInfo: false})
    }

    toggleMarkerInfo = (place, showB) => {
        this.setState({place: place, toShowMarkerInfo: showB});
    }

    render() {
        if (this.props.toShow) {
            return <div class="step-description">
                <InfoOfStep

                    infoTextClass={this.props.infoTextClass}
                    textSize={this.props.textSize}
                    steps={this.props.steps}
                    currentStep={this.props.currentStep}/>
            </div>
        }
        else {
            if (this.state.toShowMarkerInfo) {
                return <div class="step-description">
                    <HelpDescription
                        closeCurrentMarker={this.closeCurrentMarker}
                        classText="description-help-small"
                        nowLanguage={this.props.nowLanguage}
                        places={this.props.places}
                        currentStep={this.props.currentStep}
                        steps={this.props.steps}
                        toggleMarkerInfo={this.toggleMarkerInfo}
                    />
                    <InfoAboutMarker
                        closeCurrentMarker={this. closeCurrentMarker}
                        nowLanguage={this.props.nowLanguage}
                        currentStep={this.props.currentStep}
                        place={this.state.place}
                        toggleMarkerInfo={this.toggleMarkerInfo}
                    />
                </div>
            }
            else {
                return <div class="step-description">
                    <HelpDescription
                        closeCurrentMarker={this.closeCurrentMarker}
                        classText="description-help"
                        nowLanguage={this.props.nowLanguage}
                        places={this.props.places}
                        currentStep={this.props.currentStep}
                        steps={this.props.steps}
                        toggleMarkerInfo={this.toggleMarkerInfo}
                    />
                </div>
            }
        }

    }
}

class SofaStep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toShow: false
        };
    }

    showInfoCallback = () => {
        this.setState({toShow: !this.state.toShow});

    };

    render() {
        return <section class="sofa-step">
            <SofaStepHeader
                showInfoCallback={this.showInfoCallback}
                steps={this.props.steps}
                currentStep={this.props.currentStep}/>
            <DescriptionOfStep
                infoTextClass={this.props.infoTextClass}
                nowLanguage={this.props.nowLanguage}
                places={this.props.places}
                toShow={this.state.toShow} textSize={this.props.textSize}
                steps={this.props.steps}
                currentStep={this.props.currentStep}/>
        </section>
    }
}

class SofaMap extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section class="sofa-map" id="map">
        </section>
    }
}

class SofaHoldInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section class="hold-info main-section">
            <div class="the-info">
                <SofaStep
                    infoTextClass={this.props.infoTextClass}
                    textSize={this.props.textSize}
                    steps={this.props.steps}
                    currentStep={this.props.currentStep}
                    nowLanguage={this.props.nowLanguage}
                    places={this.props.places}/>
                <SofaMap/>
            </div>
        </section>
    }
}

class SofaContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stepColor: "#00508c",
            stepClicked: false
        }
    }

    clickOnStep = (steps, cS) => {
        this.props.changeCurrentStep(cS);
        this.props.fillMapWithPlaces(map, this.props.nowLanguage, cS, this.props.lat, this.props.lon, MIN_KM, MAX_KM, INC);//fill the map with markers according to the step
    }

    render() {
        return <div class="sofa-row main-section">
            <div class="sofa-content">
                <div class="empty_column"></div>
                <SofaHorizScrollMenu
                    steps={this.props.steps}
                    clickOnStep={this.clickOnStep}/>
                <SofaHoldInfo
                    infoTextClass={this.props.infoTextClass}
                    nowLanguage={this.props.nowLanguage}
                    places={this.props.places}
                    textSize={this.props.textSize}
                    steps={this.props.steps}
                    currentStep={this.props.currentStep}/>
            </div>
        </div>
    }
}

class SofaHorizScrollMenu extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return <section class="scroll-horiz main-section">
            <SofaHorizScrollMenuBody
                steps={this.props.steps}
                clickOnStep={this.props.clickOnStep}/>
            <HorizScrollButtonHolder
            />
        </section>
    }
}

class SofaHorizScrollMenuBody extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: this.props.steps
        }
    }

    eachStepName = (step, i) => {
        // onClick={()=>{this.props.clickOnStep(this.state.stepNames,i+1)}}
        return <a href="#" id={`item${i + 1}`} class=" menu-item" onClick={() => {
            this.props.clickOnStep(this.props.steps, i)
        }}>
            <img class="step-image" src={`images/step_0${i + 1}.png`}/>
            <p class="choose-step">{step.title}</p>
        </a>
    }

    render() {
        return <section class="sofa-horiz">
            {this.props.steps.map(this.eachStepName)}
            <a id="item-filler"></a>
        </section>
    }
}

class HorizScrollButtonHolder extends React.Component {

    constructor(props) {
        super(props);
    }

    scrollByLeft = (element, by, duration) => {
        if (duration <= 0) {
            return;
        }
        var perTick = by / duration * 10;
        let that = this
        setTimeout(function () {
            element.scrollLeft -= perTick;
            by -= perTick;
            if (by <= 0) {
                return;
            }
            that.scrollByLeft(element, by, duration - 10);
        }, 10);
    }

    scrollByRight = (element, by, duration) => {
        if (duration <= 0) {
            return;
        }
        var perTick = by / duration * 10;
        let that = this;
        setTimeout(function () {
            element.scrollLeft += perTick;
            by -= perTick;
            if (by <= 0) {
                return;
            }
            that.scrollByRight(element, by, duration - 10);
        }, 10);
    }

    clickLeft = () => {
        this.scrollByLeft(document.getElementsByClassName("sofa-horiz")[0], 271, 500);
    }

    clickRight = () => {
        this.scrollByRight(document.getElementsByClassName("sofa-horiz")[0], 271, 500);
    }

    render() {
        return <section class="scrollbutton-holder">
            <a class="scroll-back pointable" onClick={this.clickLeft}><h1>{"<"}</h1></a>
            <a class="scroll-forward pointable" onClick={this.clickRight}><h1>{">"}</h1></a>
        </section>
    }
}

class SideMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <section class="real-side-menu">
            <Languages
                setLanguage={this.props.setLanguage}
                currentStep={this.props.currentStep}/>
            <TextSize resizeText={this.props.resizeText}/>
        </section>
    }
}

class CasualMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div class="cas-menu">
            <IconImage/>
            <Title/>
            <CityList
                changePosition={this.props.changePosition}
                successMap={this.props.successMap}
                errorMap={this.props.errorMap}
                cityList={this.props.cityList}
                currentCity={this.props.currentCity}
                changeGlobalPosition={this.props.changeGlobalPosition}
                nowLanguage={this.props.nowLanguage}
                currentStep={this.props.currentStep}
            />
        </div>
    }
}

class SofaHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <header class="sofa-header">
            <CasualMenu
                changePosition={this.props.changePosition}
                successMap={this.props.successMap}
                errorMap={this.props.errorMap}
                cityList={this.props.cityList}
                currentCity={this.props.currentCity}
                changeGlobalPosition={this.props.changeGlobalPosition}
                nowLanguage={this.props.nowLanguage}
                currentStep={this.props.currentStep}/>
            <SideMenu
                resizeText={this.props.resizeText}
                setLanguage={this.props.setLanguage}
                currentStep={this.props.currentStep}
            />
        </header>
    }
}


function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textSize: 1,
            steps: this.props.steps,
            currentStep: 0,
            nowLanguage: "en",
            lat: 32.0852999,
            lon: 34.78176759999999,
            cityList: [],
            currentCity: "null",
            places: [],
            infoTextClass: "western"
        }
        this.getCityList(this.state.nowLanguage, this.state.currentStep);
    }

    changeCurrentStep = (step) => {
        this.setState({currentStep: step});
    }

    setCurrentCity = (currentCity) => {
        this.setState({currentCity: currentCity});
    }

    getCityList = (lang, step) => {
        let urlCurr = theUrl + `${lang}/city`;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", urlCurr, true);
        xhr.onload = function () {
            this.setState({cityList: JSON.parse(xhr.response)});
        }.bind(this);
        xhr.send();
    }
    setInfoHeight = () => {//
        if (window.innerWidth > 767) {
            document.getElementsByClassName("step-description")[0].setAttribute("style", `grid-template-rows: 
        ${(window.innerHeight - document.getElementsByClassName("step-description")[0].getBoundingClientRect().y - 10)}px;`);
            document.getElementsByClassName("sofa-map")[0].style.height =
                (window.innerHeight - document.getElementsByClassName("sofa-map")[0].getBoundingClientRect().y - 10) + "px";
        }
    }
    showLoading = () => {
        document.getElementsByClassName("loading-window")[0].style.display = "flex";
    }
    hideLoading = () => {
        document.getElementsByClassName("loading-window")[0].style.display = "none";
    }
    highlightLanguage = (nowLanguage) => {
        let langs = document.getElementsByClassName("changeLang");
        for (var i = 0; i < langs.length; i++) {
            langs[i].style.color = "rgba(110,110,110,1)";
        }
        document.getElementById(`${nowLanguage}`).style.color = "#00508c";
    }
    setTitleText = (nowLanguage) => {
        let title = document.getElementsByClassName("title-text")[0];
        switch (nowLanguage) {
            case "en":
                title.innerText = "10 STEPS OF A NEW REPATRIATE";
                break;
            case "ru":
                title.innerText = "10 ШАГОВ НОВОГО РЕПАТРИАНТА";
                break;
            case "he":
                title.innerText = "עשר שלבים של עולה חדש";
                break;
            case "fr":
                title.innerText = "10 ÉTAPES D'UN NOUVEAU RAPATRIANT";
                break;
            default:
                title.innerText = "10 STEPS OF A NEW REPATRIATE";
                break;
        }
    }
    setDataByLang = (lang) => {
        this.showLoading();
        this.setTitleText(lang);//set new title according to language you chose
        this.highlightLanguage(lang);//highlight the chosen language
        this.fillMapWithPlaces(map, lang, this.state.currentStep, this.state.lat, this.state.lon, MIN_KM, MAX_KM, INC);//fill the map with markers
        if (map)
            this.hideLoading();
    }

    getAndSetDataByLang = (lang) => {
        this.showLoading();
        let urlCurr = theUrl + lang;//url to get info by language
        let xhr = new XMLHttpRequest()
        xhr.open("GET", urlCurr, true);
        xhr.onload = function (e) {
            let data = JSON.parse(xhr.response);
            lang == "he" ? this.setState({infoTextClass: "eastern"}) : this.setState({infoTextClass: "western"});
            let steps = data.steps;//get info about steps
            steps.sort((a, b) => a.numberOfStep - b.numberOfStep);//sort the array of objects, because steps are not in the right order
            this.setState({steps: steps});
            this.setTitleText(lang);//set new title according to language you chose
            this.highlightLanguage(lang);//highlight the chosen language
            this.fillMapWithPlaces(map, lang, this.state.currentStep, this.state.lat, this.state.lon, MIN_KM, MAX_KM, INC);//fill the map with markers
            if (map)
                this.hideLoading();
        }.bind(this);
        xhr.onerror = function (e) {
            console.log(e)
        }
        xhr.send();
    }

    componentDidMount() {
        loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyB6thMLQSj4zVrofw-UAUkXu_5_D3ucCEI&callback=initMap");
        this.main();
        this.setDataByLang("en");
    }

    textSizeCallback = (inc) => {
        this.setState({textSize: this.state.textSize + inc});
    }

    setLanguage = (lang) => {
        this.setState({
            nowLanguage: lang
        });
        this.getCityList(lang, this.state.currentStep);
        this.getAndSetDataByLang(lang);//set the data according to langugage you chose
    };

    changeGlobalPosition = (lat, lon) => {
        this.setState({
            lat: lat,
            lon: lon
        });
    }

    main = () => {//intialise everything
        window.addEventListener('resize',
            function () {
                google.maps.event.trigger(map, 'resize');
            }
        );//resize the map
        this.setInfoHeight();
    }

   clearMap=()=> {//clear markers
        if (markers.length > 0) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];
        }
    }
 initMap=()=> {//initialize the google map
        bounds = new google.maps.LatLngBounds();
        geocoder = new google.maps.Geocoder;//get the geocoder to decode placeIds in further
        navigator.geolocation.getCurrentPosition(
            function (pos) {

                return this.successMap(pos, "en", 0)
            }.bind(this),
            function (err) {
                return this.errorMap(err, "en", 0)
            }.bind(this),
            options);//get location
    }
    fillMapWithPlaces = (map, lang, step, lat, lon, min, max, inc) => {
        if (map != null) {//if the map was initialized
            let urlCurr = theUrl + `step/${lang}/${step + 1}/area/${lat}/${lon}/${min}/${max}/${inc}`;//url request
            bounds = new google.maps.LatLngBounds();
            bounds.extend(myMarker.getPosition());
            let xhr = new XMLHttpRequest();
            xhr.open("GET", urlCurr, true);
            xhr.onload = function (e) {
                let placesArr = JSON.parse(xhr.response);
                this.clearMap();//clear map from markers if threre are already some
                this.setState({places: placesArr})
                if (placesArr.length != 0) {//if there are any places
                    for (var i = 0; i < placesArr.length; i++) {
                        let icon = {
                            url: icons[step + 1], // url
                            scaledSize: new google.maps.Size(20, 30), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(0, 0) // anchor
                        };//set the icon for marker
                        let marker = new google.maps.Marker({
                            map: map,
                            icon: icon,
                            place: {
                                placeId: placesArr[i].placeId,
                                location: {lat: placesArr[i].latitude, lng: placesArr[i].longitude}
                            },
                            zIndex: 0
                        });//set marker
                        bounds.extend({lat: placesArr[i].latitude, lng: placesArr[i].longitude});
                        markers.push(marker);//push marker to gloabal array so that you could delete them in future or change icons

                    }
                    map.fitBounds(bounds);
                    // fillSofaAddresses(placesArr,lang,step);//fill the div with information about markers
                }
                else {
                    console.log("no places found");
                }

                this.hideLoading();
            }.bind(this);
            xhr.send();
        }

    }
    setMap = (lat, lon, lang, step) => {
        map = null;
        var icon = {
            url: icons[10], // url
            scaledSize: new google.maps.Size(20, 20), // scaled size
            origin: new google.maps.Point(0, 0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };//set icon for my position
        var uluru = {lat: lat, lng: lon};
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        });//create map
        myMarker = new google.maps.Marker({
            position: uluru,
            map: map,
            icon: icon,
            zIndex: 2
        });//put marker
        this.fillMapWithPlaces(map, lang, step, lat, lon, MIN_KM, MAX_KM, INC);//fill the map with markers
    }
    successMap = (pos, lang, step) => {
        currentCity = "0";
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        this.setMap(lat, lon, lang, step);
        this.changeGlobalPosition(lat, lon);
        this.setCurrentCity(lat + "|" + lon + "|0");
        return [lat, lon];
    }
    changePosition = (lat, lon, lang, step) => {
        myMarker.setPosition({lat: lat, lng: lon});
        map.setCenter({lat: lat, lng: lon});
        this.fillMapWithPlaces(map, lang, step, lat, lon, MIN_KM, MAX_KM, INC);
    }

    errorMap = (err, lang, step) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        if (app.state.currentCity == "null") {
            let urlCurr = theUrl + `${lang}/city`;
            let xhr = new XMLHttpRequest();
            xhr.open("GET", urlCurr, true);
            xhr.onload = function (e) {
                let data = JSON.parse(xhr.response)
                let cityList = data;
                let TelAviv = null;
                let indexCity = 0;
                TelAviv = data.find(
                    (city, i) => {
                        if (city.name == "Tel Aviv" || city.name == "תל אביב" || city.name == "Тель-Авив") {
                            indexCity = i;
                            return city;
                        }
                    }
                );
                let currentCity = TelAviv.latitude + "|" + TelAviv.longitude;
                let lat = TelAviv.latitude;
                let lon = TelAviv.longitude;
                this.setMap(lat, lon, lang, step);
                // document.getElementsByClassName("the-list")[0].value = currentCity;
                this.hideLoading();
                this.changeGlobalPosition(lat, lon);
                this.setCurrentCity(lat + "|" + lon + "|" + indexCity);
                return [lat, lon];
            }.bind(this)
            xhr.send();
        }
        else {
            document.getElementsByClassName("the-list")[0].value = currentCity;
            return [currentCity.split("|")[0], currentCity.split("|")[2]];
            this.hideLoading();
        }
    };

    render() {
        if (toConsole)
            console.log("APP");
        return <div>
            <LoadingWindow/>
            <SofaHeader
                changePosition={this.changePosition}
                successMap={this.successMap}
                errorMap={this.errorMap}
                cityList={this.state.cityList}
                currentCity={this.state.currentCity}
                changeGlobalPosition={this.changeGlobalPosition}
                resizeText={this.textSizeCallback}
                setLanguage={this.setLanguage}
                nowLanguage={this.state.nowLanguage}
                currentStep={this.state.currentStep}
            />
            <SofaContent
                infoTextClass={this.state.infoTextClass}
                changeCurrentStep={this.changeCurrentStep}
                nowLanguage={this.state.nowLanguage}
                textSize={this.state.textSize}
                steps={this.state.steps}
                stepDesc={this.state.stepDesc}
                currentStep={this.state.currentStep}
                lat={this.state.lat}
                lon={this.state.lon}
                places={this.state.places}
                fillMapWithPlaces={this.fillMapWithPlaces}
            />
        </div>
    }
}

let app = null;

let init = () => {
    let urlCurr = theUrl + "en";//url to get info by language
    let xhr = new XMLHttpRequest()
    xhr.open("GET", urlCurr, true);
    xhr.onload = function (e) {
        let data = JSON.parse(xhr.response);
        let steps = data.steps;//get info about steps
        ReactDOM.render(
            <App ref={(child) => app = child} steps={steps}/>,
            document.getElementById('root')
        );
         initMap= app.initMap;
    }.bind(app)

    xhr.onerror = function (e) {
        console.log(e)
    }
    xhr.send();
}

init();