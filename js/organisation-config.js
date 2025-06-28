// Plaats dit bestand op een centrale locatie voor hergebruik in meerdere documenten.
var organisationConfig = {
    nl_organisationName: "Logius",
    nl_organisationStylesURL: "https://gitdocumentatie.logius.nl/publicatie/respec/style/",
    nl_organisationPublishURL: "https://gitdocumentatie.logius.nl/publicatie/",
    logos: [{
        src: "https://gitdocumentatie.logius.nl/publicatie/respec/style/logos/figure-logius.svg",
        alt: "Logius",
        id: "Logius",
        height: 77,
        width: 44,
        url: "https://www.logius.nl/standaarden",
    }],

    postProcess: [window.respecMermaid.createFigures],

    latestVersion: ["nl_organisationPublishURL", "pubDomain", "/", "shortName"],
    thisVersion: ["nl_organisationPublishURL", "pubDomain", "/", "specStatus", "-", "specType", "-", "shortName", "-", "publishDate"],
    prevVersion: ["nl_organisationPublishURL", "pubDomain", "/", "previousMaturity", "-", "specType", "-", "shortName", "-", "previousPublishDate"],
    useLogo: true,
    useLabel: true,
    license: "cc0",
    addSectionLinks: true,
    maxTocLevel: 3,

    localizationStrings: {
        en: {
            wv: "Draft",
            cv: "Recommendation",
            vv: "Proposed recommendation",
            def: "Definitive version",
            basis: "Document",
            eo: "Outdated version",
            tg: "Rescinded version",
            no: "Norm",
            st: "Standard",
            im: "Information model",
            pr: "Guideline",
            hr: "Guide",
            wa: "Proposed recommendation",
            al: "General",
            bd: "Governance documentation",
            bp: "Best practice",
        },
        nl: {
            wv: "Werkversie",
            cv: "Consultatieversie",
            vv: "Versie ter vaststelling",
            def: "Vastgestelde versie",
            basis: "Document",
            eo: "Verouderde versie",
            tg: "Teruggetrokken versie",
            no: "Norm",
            st: "Standaard",
            im: "Informatiemodel",
            pr: "Praktijkrichtlijn",
            hr: "Handreiking",
            wa: "Werkafspraak",
            al: "Algemeen",
            bd: "Beheerdocumentatie",
            bp: "Best practice",
        },
    },

    sotdText: {
        nl: {
            sotd: "Status van dit document",
            def: `Dit is de definitieve versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
            wv: `Dit is een werkversie die op elk moment kan worden gewijzigd, verwijderd of vervangen door andere documenten. Het is geen door het TO goedgekeurde consultatieversie.`,
            cv: `Dit is een door het TO goedgekeurde consultatieversie. Commentaar over dit document kan gestuurd worden naar `,
            vv: `Dit is een definitief concept van de nieuwe versie van dit document. Wijzigingen naar aanleiding van consultaties zijn doorgevoerd.`,
            basis: "Dit is een document zonder officiële status.",
        },
        en: {
            sotd: "Status of This Document",
            def: `This is the definitive version of this document. Edits resulting from consultations have been applied.`,
            wv: `This is a draft that could be altered, removed or replaced by other documents. It is not a recommendation approved by TO.`,
            cv: `This is a proposed recommendation approved by TO. Comments regarding this document may be sent to `,
            vv: `This is the definitive concept of this document. Edits resulting from consultations have been applied.`,
            basis: "This document has no official standing.",
        },
    },

    labelColor: {
        def: "#154273",
        wv: "#39870c",
    },
	
    licenses: {
        cc0: {
            name: "Creative Commons 0 Public Domain Dedication",
            short: "CC0",
            url: "https://creativecommons.org/publicdomain/zero/1.0/",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-zero.svg",
        },
        "cc-by": {
            name: "Creative Commons Attribution 4.0 International Public License",
            short: "CC-BY",
            url: "https://creativecommons.org/licenses/by/4.0/legalcode",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by.svg",
        },
        "cc-by-nd": {
            name: "Creative Commons Naamsvermelding-GeenAfgeleideWerken 4.0 Internationaal",
            short: "CC-BY-ND",
            url: "https://creativecommons.org/licenses/by-nd/4.0/legalcode.nl",
            image: "https://gitdocumentatie.logius.nl/publicatie/respec/media/logos/cc-by-nd.svg",
        },
    },

    localBiblio: {
        "XACML": {
            href: "https://www.oasis-open.org/committees/xacml/repository/cs-xacml-specification-1.1.pdf",
            title: "eXtensible Access Control Markup Language (XACML) Version 1.1",
            authors: ["Simon Godik", "Tim Moses (Ed.)"],
            date: "2006"
        },
        "IANA.well-known-uris": {
            href: "https://www.iana.org/assignments/well-known-uris/well-known-uris.xhtml",
            title: "Well-Known URIs",
            date: "2010-01-20"
        },
        "MIM": {
            href: "https://docs.geostandaarden.nl/mim/mim/",
            title: "Metamodel Informatie Modellering",
            date: "13 juni 2024"
        },
        "REST API Design Rules": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/adr/",
            title: "NLGov REST API Design Rules 2.0.0",
            authors: ["Jasper Roes", "Joost Farla"],
            date: "Maart 2024"
        },
        "Logboek dataverwerkingen": {
            href: "https://logius-standaarden.github.io/logboek-dataverwerkingen/",
            title: "Logboek dataverwerkingen",
            authors: ["Eelco Hotting", "Vedran Bilanovic"],
            date: "n.t.b."
        },
        "W3C Verifiable Credentials": {
            href: "https://www.w3.org/TR/vc-data-model/",
            title: "Verifiable Credentials Data Model v1.1",
            authors: ["Manu Sporny", "Dave Longley", "David Chadwick"],
            date: "3 maart 2022"
        },
        "NL GOV Assurance profile for OAuth": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/oauth/",
            title: "NL GOV Assurance profile for OAuth 2.0",
            authors: ["Frank Terpstra", "Jan van Gelder"],
            date: "9 juli 2020"
        },
        "FSC - Core": {
            href: "https://commonground.gitlab.io/standards/fsc/core/draft-fsc-core-00.html",
            title: "FSC - Core",
            authors: ["Eelco Hotting", "Ronald Koster", "Henk van Maanen", "Niels Dequeker", "Edward van Gelderen", "Pim Gaemers"],
            date: "8 december 2023"
        },
        "OpenID NLGov": {
            href: "https://gitdocumentatie.logius.nl/publicatie/api/oidc/",
            title: "OpenID NLGov 1.0.1",
            authors: ["Remco Schaar", "Frank van Es", "Joris Joosten", "Jan Geert Koops"],
            date: "18 september 2023"
        },
        "SAML": {
            href: "https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf",
            title: "Assertions and Protocols for the OASIS Security Assertion Markup Language (SAML) V2.0",
            authors: ["Scott Cantor", "John Kemp", "Rob Philpott", "Eve Maler"],
            date: "15 maart 2005"
        }
    },
}
