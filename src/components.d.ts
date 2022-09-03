/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ISurveyQuestion, ISurveyQuestionType } from "./utils/response";
export namespace Components {
    interface DcElectionCandidate {
        "bio": string;
        "fullname": string;
        "office": string;
        "photo": string;
    }
    interface DcElectionGallery {
        "appearance": "grid" | "stack" | "narrow"| "quote";
        "candidates": Array<any>;
    }
    interface DcElectionQuestion {
        "question": ISurveyQuestion;
        /**
          * Holds an Array of answers to candidates [    {response: "Yes", "candidates": ["C1", "C2"]},    {response: "No", "candidates": ["C3", "C4"]}  ]
         */
        "responses": Array<any>;
        "showNoResponse": boolean;
        "type": ISurveyQuestionType;
    }
    interface DcElectionSurvey {
        "filename": string;
        "format": string;
    }
}
declare global {
    interface HTMLDcElectionCandidateElement extends Components.DcElectionCandidate, HTMLStencilElement {
    }
    var HTMLDcElectionCandidateElement: {
        prototype: HTMLDcElectionCandidateElement;
        new (): HTMLDcElectionCandidateElement;
    };
    interface HTMLDcElectionGalleryElement extends Components.DcElectionGallery, HTMLStencilElement {
    }
    var HTMLDcElectionGalleryElement: {
        prototype: HTMLDcElectionGalleryElement;
        new (): HTMLDcElectionGalleryElement;
    };
    interface HTMLDcElectionQuestionElement extends Components.DcElectionQuestion, HTMLStencilElement {
    }
    var HTMLDcElectionQuestionElement: {
        prototype: HTMLDcElectionQuestionElement;
        new (): HTMLDcElectionQuestionElement;
    };
    interface HTMLDcElectionSurveyElement extends Components.DcElectionSurvey, HTMLStencilElement {
    }
    var HTMLDcElectionSurveyElement: {
        prototype: HTMLDcElectionSurveyElement;
        new (): HTMLDcElectionSurveyElement;
    };
    interface HTMLElementTagNameMap {
        "dc-election-candidate": HTMLDcElectionCandidateElement;
        "dc-election-gallery": HTMLDcElectionGalleryElement;
        "dc-election-question": HTMLDcElectionQuestionElement;
        "dc-election-survey": HTMLDcElectionSurveyElement;
    }
}
declare namespace LocalJSX {
    interface DcElectionCandidate {
        "bio"?: string;
        "fullname"?: string;
        "office"?: string;
        "photo"?: string;
    }
    interface DcElectionGallery {
        "appearance"?: "grid" | "stack" | "narrow"| "quote";
        "candidates"?: Array<any>;
    }
    interface DcElectionQuestion {
        "question"?: ISurveyQuestion;
        /**
          * Holds an Array of answers to candidates [    {response: "Yes", "candidates": ["C1", "C2"]},    {response: "No", "candidates": ["C3", "C4"]}  ]
         */
        "responses"?: Array<any>;
        "showNoResponse"?: boolean;
        "type"?: ISurveyQuestionType;
    }
    interface DcElectionSurvey {
        "filename"?: string;
        "format"?: string;
    }
    interface IntrinsicElements {
        "dc-election-candidate": DcElectionCandidate;
        "dc-election-gallery": DcElectionGallery;
        "dc-election-question": DcElectionQuestion;
        "dc-election-survey": DcElectionSurvey;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dc-election-candidate": LocalJSX.DcElectionCandidate & JSXBase.HTMLAttributes<HTMLDcElectionCandidateElement>;
            "dc-election-gallery": LocalJSX.DcElectionGallery & JSXBase.HTMLAttributes<HTMLDcElectionGalleryElement>;
            "dc-election-question": LocalJSX.DcElectionQuestion & JSXBase.HTMLAttributes<HTMLDcElectionQuestionElement>;
            "dc-election-survey": LocalJSX.DcElectionSurvey & JSXBase.HTMLAttributes<HTMLDcElectionSurveyElement>;
        }
    }
}
