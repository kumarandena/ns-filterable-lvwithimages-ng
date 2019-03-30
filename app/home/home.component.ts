import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { SearchBar } from "ui/search-bar";
import { isIOS } from "tns-core-modules/platform";
import { ObservableArray } from "tns-core-modules/data/observable-array";

declare const IQKeyboardManager: any;

class DataItem {
    constructor(public name: string, public title: string, public imageSrc: string) { }
}

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    allPeople: Array<DataItem> = [
        { name: "Jane McDonald", title: "Developer Advocate", imageSrc: "https://placem.at/people?random=11&w=500&txt=0" },
        { name: "Steven Philips", title: "Social Media Coordinator", imageSrc: "https://placem.at/people?random=2&w=500&txt=0" },
        { name: "Mary Landow", title: "Product Marketing Manager", imageSrc: "https://placem.at/people?random=3&w=500&txt=0" },
        { name: "Sam", title: "Company Dog", imageSrc: "https://placem.at/people?random=4&w=500&txt=0" },
        { name: "Abby Keefer", title: "Customer Success Manager", imageSrc: "https://placem.at/people?random=5&w=500&txt=0" },
        { name: "Michelle Rodgers", title: "VP Engineering", imageSrc: "https://placem.at/people?random=6&w=500&txt=0" },
        { name: "Lucy Gold", title: "Marketing Intern", imageSrc: "https://placem.at/people?random=77&w=500&txt=0" },
        { name: "Jerry Kramer", title: "Senior Engineer", imageSrc: "https://placem.at/people?random=99&w=500&txt=0" },
        { name: "Kelna Cuevas", title: "Principal Product Manager", imageSrc: "https://placem.at/people?random=55&w=500&txt=0" },
        { name: "Sierra Riley", title: "Sales Coordinator", imageSrc: "https://placem.at/people?random=44&w=500&txt=0" },
        { name: "Lilly Morris", title: "Engineering Intern", imageSrc: "https://placem.at/people?random=123&w=500&txt=0" },
        { name: "Ariel Rhodes", title: "Customer Success Manager", imageSrc: "https://placem.at/people?random=33&w=500&txt=0" }
    ];

    public people: ObservableArray<DataItem> = new ObservableArray<DataItem>();

    constructor() {
        this.people = new ObservableArray<DataItem>(this.allPeople);

        if (isIOS) {
            var keyboard = IQKeyboardManager.sharedManager();
            keyboard.shouldResignOnTouchOutside = true;
        }
    }
 
    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

    onSearch(searchValue) {
        this.people = new ObservableArray<DataItem>();
        if (searchValue !== "") {
            for (let i = 0; i < this.allPeople.length; i++) {
                if (this.allPeople[i].name.toLowerCase().indexOf(searchValue) !== -1) {
                    this.people.push(this.allPeople[i]);
                }
            }
        }
    }

    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for a people and press enter";

        this.people = new ObservableArray<DataItem>();
        this.allPeople.forEach(item => {
            this.people.push(item);
        });
    }

    public onTextChange(args) {
        let searchBar = <SearchBar>args.object;
        this.onSearch(searchBar.text ? searchBar.text.toLowerCase() : "");
    }

    ngOnInit(): void { }
}
