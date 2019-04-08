import { Injectable } from '@angular/core';

@Injectable()
export class InvitationsActions {
  public static readonly INVITATIONS_LOAD_START = '[INVITATIONS_MANIPULATION]INVITATIONS_LOAD_START';
  public static readonly INVITATIONS_LOAD_FAILED = '[INVITATIONS_MANIPULATION]INVITATIONS_LOAD_FAILED';
  public static readonly INVITATIONS_LOAD_SUCCEEDED = '[INVITATIONS_MANIPULATION]INVITATIONS_LOAD_SUCCEEDED';
  public static readonly INVITATIONS_RESPONSE_START = '[INVITATIONS_MANIPULATION]INVITATIONS_SAVE_START';
  public static readonly INVITATIONS_RESPONSE_FAILED = '[INVITATIONS_MANIPULATION]INVITATIONS_SAVE_FAILED';
  public static readonly INVITATIONS_RESPONSE_SUCCEEDED = '[INVITATIONS_MANIPULATION]INVITATIONS_SAVE_SUCCEEDED';

  constructor() {}

  startLoadingInvitations() {
    return {
      type: InvitationsActions.INVITATIONS_LOAD_START
    };
  }

  invitationsLoadingSucceded(invitationData: any) {
    return {
      type: InvitationsActions.INVITATIONS_LOAD_SUCCEEDED,
      payload: invitationData
    };
  }

  invitationsLoadingFailed(error: any) {
    return {
      type: InvitationsActions.INVITATIONS_LOAD_FAILED,
      error
    };
  }

  invitationResponseStart(invitationData: any, status: any) {
    return {
      type: InvitationsActions.INVITATIONS_RESPONSE_START,
      payload: {
        invitationData,
        status
      }
    };
  }

  invitationResponseFailed(error: any) {
    return {
      type: InvitationsActions.INVITATIONS_RESPONSE_FAILED,
      error
    };
  }

  invitationResponseSucceeded(statusData: any, eventData: any, oldInvitationId: any) {
    return {
      type: InvitationsActions.INVITATIONS_RESPONSE_SUCCEEDED,
      payload: {
        statusData,
        eventData,
        oldInvitationId
      }
    };
  }
}
