package com.team16.sanatos.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "doctor_log")
public class DoctorLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_log_id")
    private Integer doctorLogId;

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "action_type")
    private String actionType;

    @Column(name = "action_timestamp")
    private Timestamp actionTimestamp;

    @Column(name = "details", columnDefinition = "TEXT")
    private String details;

    // Constructors, getters, and setters


    public Integer getDoctorLogId() {
        return doctorLogId;
    }

    public void setDoctorLogId(Integer doctorLogId) {
        this.doctorLogId = doctorLogId;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public Timestamp getActionTimestamp() {
        return actionTimestamp;
    }

    public void setActionTimestamp(Timestamp actionTimestamp) {
        this.actionTimestamp = actionTimestamp;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}